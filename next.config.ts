import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // La hoja de vida se descarga directamente en vez de abrirse en el navegador.
  async headers() {
    return [
      {
        source: "/HV-Santiago-Rivas.pdf",
        headers: [{ key: "Content-Disposition", value: 'attachment; filename="HV-Santiago-Rivas.pdf"' }],
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
