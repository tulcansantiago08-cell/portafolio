export type Project = {
  title: string;
  description: string;
  /** Captura del proyecto. También se usa en la cinta si no hay video. */
  image: string;
  /** Video opcional para la cinta animada. Debe permitir CORS si es de otro dominio. */
  video?: string;
  tags: string[];
  github: string;
  /** Enlace a la demo. Si no hay, se oculta el botón y la tarjeta abre GitHub. */
  demo?: string;
  /** Archivos para descargar directamente (instaladores publicados en GitHub Releases). */
  downloads?: { label: string; href: string }[];
};

const releases = "https://github.com/tulcansantiago08-cell";

export const projects: Project[] = [
  {
    title: "CityPulse",
    description:
      "App Android para viajeros que muestra conciertos, ferias y actividades que están pasando ahora en la ciudad, priorizando lo que queda cerca a pie, con mapa y rutas.",
    image: "/images/citypulse-cover.jpg",
    tags: ["Kotlin", "Jetpack Compose", "Firebase", "Room"],
    github: "https://github.com/tulcansantiago08-cell/CityPulse",
    downloads: [{ label: "APK Android", href: `${releases}/CityPulse/releases/download/v0.1.0/CityPulse.apk` }],
  },
  {
    title: "Tanqueo",
    description:
      "App para smartwatch Wear OS que registra cada tanqueo del carro o la moto, estima cuánto te dura la gasolina y te avisa cuándo volver a tanquear.",
    image: "/images/tanqueo-cover.jpg",
    tags: ["Kotlin", "Wear OS", "Room", "Gemini"],
    github: "https://github.com/tulcansantiago08-cell/Tanqueo",
    downloads: [{ label: "APK reloj", href: `${releases}/Tanqueo/releases/download/v0.1.0/Tanqueo-reloj.apk` }],
  },
  {
    title: "PixelMate",
    description:
      "Mascota en pixel art que vive en el escritorio del Mac: organiza jornadas con descansos, pone alarmas y recordatorios, y conversa por voz con IA.",
    image: "/images/pixelmate-cover.jpg",
    tags: ["Flutter", "Dart", "Riverpod", "macOS"],
    github: "https://github.com/tulcansantiago08-cell/PixelMate",
    downloads: [
      { label: "macOS", href: `${releases}/PixelMate/releases/download/v1.5.0/PixelMate-1.5.0-macOS.zip` },
      { label: "Windows", href: `${releases}/PixelMate/releases/download/v1.5.0/PixelMate-1.5.0-Windows.zip` },
      { label: "Linux", href: `${releases}/PixelMate/releases/download/v1.5.0/PixelMate-1.5.0-Linux-x64.tar.gz` },
    ],
  },
  // Pendiente: el juego, cuando esté listo.
];
