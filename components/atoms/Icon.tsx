import { cn } from "@/lib/cn";

const strokeIcons = {
  mail: "M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM3 7l9 6 9-6",
  phone:
    "M6.6 3H4a1 1 0 0 0-1 1.1C3.6 13 11 20.4 19.9 21a1 1 0 0 0 1.1-1v-2.6a1 1 0 0 0-.8-1l-3.6-.7a1 1 0 0 0-.9.3l-1.6 1.6a14 14 0 0 1-6.7-6.7l1.6-1.6a1 1 0 0 0 .3-.9L8.6 3.8a1 1 0 0 0-1-.8z",
  menu: "M4 6h16M4 12h16M4 18h16",
  close: "M6 6l12 12M18 6L6 18",
  "arrow-up": "M12 20V4M5 11l7-7 7 7",
  download: "M12 3v12M7 10l5 5 5-5M4 21h16",
  external: "M14 4h6v6M20 4l-9 9M18 14v6H4V6h6",
};

const fillIcons = {
  github: {
    viewBox: "0 0 16 16",
    path: "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z",
  },
  linkedin: {
    viewBox: "0 0 24 24",
    path: "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z",
  },
};

export type IconName = keyof typeof strokeIcons | keyof typeof fillIcons;

type IconProps = {
  name: IconName;
  className?: string;
};

/** Decorativo: el texto accesible lo pone el componente que lo usa. */
export default function Icon({ name, className }: IconProps) {
  const classes = cn("size-5 shrink-0", className);

  if (name === "github" || name === "linkedin") {
    const icon = fillIcons[name];
    return (
      <svg viewBox={icon.viewBox} fill="currentColor" aria-hidden="true" className={classes}>
        <path d={icon.path} />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={classes}
    >
      <path d={strokeIcons[name]} />
    </svg>
  );
}
