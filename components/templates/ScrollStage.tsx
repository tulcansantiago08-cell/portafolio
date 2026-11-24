import type { ReactNode, RefObject } from "react";
import { cn } from "@/lib/cn";

type ScrollStageProps = {
  ref: RefObject<HTMLDivElement | null>;
  /** Altura del recorrido: cuanto mayor, más lenta la animación. */
  trackClassName: string;
  stageClassName?: string;
  children: ReactNode;
};

/** Recorrido largo con una escena fija a pantalla completa adentro. */
export default function ScrollStage({ ref, trackClassName, stageClassName, children }: ScrollStageProps) {
  return (
    <div ref={ref} className={trackClassName}>
      <div className={cn("sticky top-0 h-svh overflow-hidden bg-background", stageClassName)}>{children}</div>
    </div>
  );
}
