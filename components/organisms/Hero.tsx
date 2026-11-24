"use client";

import { useCallback, useRef } from "react";
import Avatar from "@/components/atoms/Avatar";
import Button from "@/components/atoms/Button";
import Text from "@/components/atoms/Text";
import StageHeadline from "@/components/molecules/StageHeadline";
import ScrollStage from "@/components/templates/ScrollStage";
import { profile } from "@/data/profile";
import { applyHeadline } from "@/lib/motion/headline";
import { mix } from "@/lib/motion/math";
import { useScrollProgress } from "@/lib/motion/useScrollProgress";

/* El titular se anima solo hasta donde el nombre se lee; el scroll hace el resto. */
const REST = 0.24;
const EXIT = 0.58;
const mapProgress = (scroll: number) => mix(REST, EXIT, scroll);

export default function Hero() {
  const trackRef = useRef<HTMLDivElement>(null);

  const apply = useCallback((p: number) => {
    if (trackRef.current) applyHeadline(trackRef.current, p);
  }, []);
  useScrollProgress(trackRef, apply, { mode: "track", from: 0, map: mapProgress, reducedValue: REST });

  return (
    <section id="inicio">
      <ScrollStage ref={trackRef} trackClassName="h-[180vh] motion-reduce:h-svh">
        <StageHeadline as="h1" lines={profile.headline} caption={profile.role} captionBelow />

        <div className="absolute inset-x-[18px] bottom-[18px] grid grid-cols-[1fr_auto] items-end gap-4 md:inset-x-8 md:bottom-[26px] md:grid-cols-[1fr_auto_1fr]">
          <div className="flex items-end gap-3">
            <Avatar name={profile.name} initials={profile.initials} src={profile.photo} size="md" />
            <Text variant="small" className="max-w-[17em] text-foreground">
              {profile.tagline}
            </Text>
          </div>
          <p className="hidden font-mono text-[11.5px] tracking-label md:block">
            {profile.disciplines.map((discipline, index) => (
              <span key={discipline}>
                {index > 0 && <span className="mx-[.9em] text-muted">/</span>}
                {discipline}
              </span>
            ))}
          </p>
          <div className="flex flex-col items-end gap-3 justify-self-end md:flex-row md:items-center">
            <Button href="#proyectos" variant="ghost">
              Ver proyectos
            </Button>
            <Button href={profile.cvUrl} download icon="download">
              Descargar CV
            </Button>
          </div>
        </div>
      </ScrollStage>
    </section>
  );
}
