import * as THREE from "three";
import { clamp, mix, out, span } from "@/lib/motion/math";

export type RibbonItem = {
  title: string;
  href: string;
  image: string;
  video?: string;
};

export type Ribbon = {
  /** Número de filas de la cuadrícula final. */
  readonly rows: number;
  setProgress: (p: number) => void;
  /** Activa o detiene el dibujo y los videos según la escena esté a la vista. */
  setActive: (active: boolean) => void;
  /** Tarjeta de la cuadrícula bajo el puntero; coordenadas de 0 a 1 en la escena. */
  hit: (x: number, y: number) => RibbonItem | null;
  resize: () => void;
  dispose: () => void;
};

/* Tiempos de la línea de tiempo (progreso p de 0 a 1). */
const RIB_A = 0.14;
const RIB_B = 0.63;
const FLY = 0.13;
const HOVER_FROM = 0.86;

/* Cuadrícula final de 2 × 2: cada proyecto es una sola tarjeta y nunca se repite. */
const MAX_CARDS = 4;
const COLS = 2;
/* Alto máximo de cada tarjeta respecto a la pantalla, para que las dos filas quepan. */
const MAX_CARD_HEIGHT = 0.38;

const FOV = 35;
const SAMPLES = 1200;
const PH0 = -1.5;
const PH1 = Math.PI * 2 + 1.35;
const CARD_W = 2.1;
const CARD_H = 1.32;
const GAP = 0.03;
const STEP = CARD_W + GAP;
const NX = 28;
const NY = 3;
const GZ = 8;

const vertexShader = `varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`;
const fragmentShader = `uniform sampler2D map;uniform vec2 cover;uniform float aspect,ready,radius;varying vec2 vUv;
void main(){
  vec2 q=(abs(vUv-.5)-.5)*vec2(aspect,1.)+radius;
  float d=length(max(q,0.))+min(max(q.x,q.y),0.)-radius;
  float px=fwidth(d),a=1.-smoothstep(-px,px,d);
  if(a<.01)discard;
  vec2 uv=vUv;if(!gl_FrontFacing)uv.x=1.-uv.x;
  vec3 c=mix(vec3(.075),texture2D(map,(uv-.5)*cover+.5).rgb,ready);
  float edge=smoothstep(-.012-px,-.012,d);
  gl_FragColor=vec4(mix(c,vec3(1.),edge*.1),a);
}`;

/** El riel es fijo: la cinta solo se desliza sobre él. */
function buildRail() {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= 160; i++) {
    const t = i / 160;
    const ph = mix(PH0, PH1, t);
    const cs = Math.cos(ph);
    const u = 2 * t - 1;
    // Arco suave cerca de la cámara y recorridos largos muy atrás.
    const depth = cs > 0 ? 7.6 + 16.4 * cs ** 0.9 : 7.6 + 2.2 * cs;
    const edge = 0.84 + 0.5 * span(0.14 - t, 0, 0.14) + 0.8 * span(t, 0.84, 1);
    points.push(
      new THREE.Vector3(
        edge * Math.sin(ph) * depth * 0.561,
        0.5 * Math.sign(u) * Math.abs(u) ** 1.4 * depth * 0.63,
        -depth,
      ),
    );
  }

  const curve = new THREE.CatmullRomCurve3(points, false, "centripetal");
  curve.arcLengthDivisions = 1500;

  const positions: THREE.Vector3[] = [];
  const tangents: THREE.Vector3[] = [];
  for (let i = 0; i <= SAMPLES; i++) {
    positions.push(curve.getPointAt(i / SAMPLES));
    tangents.push(curve.getTangentAt(i / SAMPLES));
  }
  return { length: curve.getLength(), positions, tangents };
}

/** Lanza un error si el navegador no soporta WebGL. */
export function createRibbon(canvas: HTMLCanvasElement, items: RibbonItem[]): Ribbon {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setClearColor(0, 0);
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 100);
  const rail = buildRail();

  const point = new THREE.Vector3();
  const tangent = new THREE.Vector3();
  const up = new THREE.Vector3();
  const vertex = new THREE.Vector3();
  const worldUp = new THREE.Vector3(0, 1, 0);

  const sampleRail = (s: number) => {
    const f = clamp(s / rail.length) * SAMPLES;
    const i = Math.min(SAMPLES - 1, Math.floor(f));
    const k = f - i;
    point.lerpVectors(rail.positions[i], rail.positions[i + 1], k);
    tangent.lerpVectors(rail.tangents[i], rail.tangents[i + 1], k).normalize();
  };

  const cards = items.slice(0, MAX_CARDS).map((item, i) => {
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
      uniforms: {
        map: { value: null },
        cover: { value: new THREE.Vector2(1, 1) },
        aspect: { value: CARD_W / CARD_H },
        ready: { value: 0 },
        radius: { value: 0.018 },
      },
    });

    const applyCover = (width: number, height: number) => {
      const media = width / height;
      const card = CARD_W / CARD_H;
      material.uniforms.cover.value.set(media > card ? card / media : 1, media > card ? 1 : media / card);
      material.uniforms.ready.value = 1;
    };

    const configure = (texture: THREE.Texture) => {
      texture.colorSpace = THREE.NoColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = false;
      material.uniforms.map.value = texture;
      return texture;
    };

    let video: HTMLVideoElement | null = null;
    let texture: THREE.Texture;
    if (item.video) {
      const element = document.createElement("video");
      element.crossOrigin = "anonymous";
      element.muted = true;
      element.loop = true;
      element.playsInline = true;
      element.preload = "auto";
      element.setAttribute("playsinline", "");
      element.src = item.video;
      element.addEventListener("loadeddata", () => applyCover(element.videoWidth, element.videoHeight));
      video = element;
      texture = configure(new THREE.VideoTexture(element));
    } else {
      texture = configure(
        new THREE.TextureLoader().load(item.image, (loaded) => {
          const image = loaded.image as HTMLImageElement;
          applyCover(image.width, image.height);
        }),
      );
    }

    const geometry = new THREE.PlaneGeometry(1, 1, NX, NY);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.frustumCulled = false;
    scene.add(mesh);

    return { i, item, video, texture, geometry, material, mesh, slot: null as Slot | null };
  });

  type Slot = ReturnType<typeof gridSlot>;
  type Card = (typeof cards)[number];

  let aspect = 1;
  let rows = 2;
  let tanH = 0.3153;

  function resize() {
    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;
    aspect = width / height;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, false);
    camera.aspect = aspect;
    // Por debajo de 16:9 se mantiene fija la vista horizontal para no aplastar la cinta.
    camera.fov = aspect < 16 / 9 ? (Math.atan(0.561 / aspect) * 360) / Math.PI : FOV;
    camera.updateProjectionMatrix();
    tanH = Math.tan((camera.fov * Math.PI) / 360);
    rows = Math.ceil(cards.length / COLS);
  }

  function gridSlot(i: number) {
    const vh = 2 * GZ * tanH;
    const vw = vh * aspect;
    const gw = Math.min(vw * 0.88, vh * MAX_CARD_HEIGHT * (CARD_W / CARD_H) * COLS);
    const gap = gw * 0.017;
    const w = (gw - gap * (COLS - 1)) / COLS;
    const h = w / (CARD_W / CARD_H);
    const gh = h * rows + gap * 1.6 * (rows - 1);
    const c = i % COLS;
    const r = Math.floor(i / COLS);
    return {
      x: -gw / 2 + w / 2 + c * (w + gap),
      y: gh / 2 - h / 2 - r * (h + gap * 1.6),
      w,
      h,
      vw,
      vh,
      c,
      r,
    };
  }

  function poseOnRail(card: Card, head: number) {
    const position = card.geometry.attributes.position;
    const centre = head - card.i * STEP;
    for (let iy = 0; iy <= NY; iy++) {
      for (let ix = 0; ix <= NX; ix++) {
        const k = iy * (NX + 1) + ix;
        sampleRail(centre + (ix / NX - 0.5) * CARD_W);
        up.copy(worldUp).addScaledVector(tangent, -worldUp.dot(tangent)).normalize();
        vertex.copy(point).addScaledVector(up, (0.5 - iy / NY) * CARD_H);
        position.setXYZ(k, vertex.x, vertex.y, vertex.z);
      }
    }
    position.needsUpdate = true;
  }

  function poseInGrid(card: Card, q: number) {
    const slot = gridSlot(card.i);
    const position = card.geometry.attributes.position;
    // Cada tarjeta llega desde su esquina: izquierda o derecha, arriba o abajo.
    const side = slot.c === 0 ? -1 : 1;
    const dy = slot.r < rows / 2 ? 1 : -1;
    const ox = side * slot.vw * 0.37 * (1 - q);
    const oy = dy * slot.vh * 0.34 * (1 - q);
    const tilt = (1 - q) * 0.22 * side * dy;
    const cs = Math.cos(tilt);
    const sn = Math.sin(tilt);
    for (let iy = 0; iy <= NY; iy++) {
      for (let ix = 0; ix <= NX; ix++) {
        const k = iy * (NX + 1) + ix;
        const x = (ix / NX - 0.5) * slot.w;
        const y = (0.5 - iy / NY) * slot.h;
        position.setXYZ(
          k,
          slot.x + ox + x * cs - y * sn,
          slot.y + oy + x * sn + y * cs,
          -GZ - (1 - q) * 0.6 * Math.sin((ix / NX) * Math.PI),
        );
      }
    }
    position.needsUpdate = true;
    card.slot = slot;
  }

  let progress = 0;

  function draw() {
    const total = rail.length + cards.length * STEP;
    const head = mix(0, total, span(progress, RIB_A, RIB_B));
    const end = rail.length - CARD_W;

    for (const card of cards) {
      const s = head - card.i * STEP;
      if (s < end) {
        card.mesh.visible = s > CARD_W;
        card.slot = null;
        if (card.mesh.visible) poseOnRail(card, head);
      } else {
        // Cada tarjeta vuela a su lugar en cuanto sale del riel.
        const start = mix(RIB_A, RIB_B, (end + card.i * STEP) / total);
        const q = out(span(progress, start, start + FLY));
        card.mesh.visible = q > 0.001;
        if (card.mesh.visible) poseInGrid(card, q);
      }
    }
    renderer.render(scene, camera);
  }

  const syncVideos = (active: boolean) => {
    for (const card of cards) {
      if (!card.video) continue;
      const shouldPlay = active && card.mesh.visible;
      if (shouldPlay && card.video.paused) card.video.play().catch(() => {});
      else if (!shouldPlay && !card.video.paused) card.video.pause();
    }
  };

  let frame = 0;
  function loop() {
    draw();
    syncVideos(true);
    frame = requestAnimationFrame(loop);
  }

  window.addEventListener("resize", resize);
  resize();

  return {
    get rows() {
      return rows;
    },
    setProgress(p) {
      progress = p;
    },
    setActive(active) {
      if (active && !frame) {
        frame = requestAnimationFrame(loop);
      } else if (!active && frame) {
        cancelAnimationFrame(frame);
        frame = 0;
        syncVideos(false);
      }
    },
    hit(x, y) {
      if (progress <= HOVER_FROM) return null;
      for (const card of cards) {
        const slot = card.slot;
        if (!slot) continue;
        const dx = (x - 0.5) * slot.vw - slot.x;
        const dy = (0.5 - y) * slot.vh - slot.y;
        if (Math.abs(dx) < slot.w / 2 && Math.abs(dy) < slot.h / 2) return card.item;
      }
      return null;
    },
    resize,
    dispose() {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      for (const card of cards) {
        if (card.video) {
          card.video.pause();
          card.video.removeAttribute("src");
          card.video.load();
        }
        card.texture.dispose();
        card.geometry.dispose();
        card.material.dispose();
      }
      renderer.dispose();
    },
  };
}
