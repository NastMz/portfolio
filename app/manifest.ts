import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kevin Martinez - Portfolio",
    short_name: "KM Portfolio",
    description: "Portfolio of Kevin Martinez, .NET backend developer",
    start_url: "/",
    display: "standalone",
    background_color: "#0e0e0e",
    theme_color: "#ff7cf5",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
