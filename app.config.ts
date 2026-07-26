import { defineConfig } from "@solidjs/start/config";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  vite: {
    plugins: [
      VitePWA({
        // vinxi serves static assets (incl. the SW + manifest) under /_build/.
        // We emit the manifest as .json because Nitro serves that extension as
        // a static file (it swallows .webmanifest into the SPA fallback).
        manifestFilename: "manifest.json",
        registerType: "prompt",
        injectRegister: null,
        devOptions: {
          enabled: true,
          type: "module"
        },
        manifest: {
          name: "SolidUI Dashboard",
          short_name: "SolidDash",
          description: "Test dashboard built with SolidStart, SolidUI, Primitives, formisch and vite-plugin-pwa.",
          theme_color: "#0f172a",
          background_color: "#ffffff",
          display: "standalone",
          start_url: "/",
          scope: "/",
          icons: [
            { src: "/pwa-192x192.png", sizes: "192x192", type: "image/png" },
            { src: "/pwa-512x512.png", sizes: "512x512", type: "image/png" },
            { src: "/maskable-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" }
          ]
        },
        workbox: {
          globPatterns: ["**/*.{js,css,html,svg,png,ico,woff2}"],
          navigateFallback: "/index.html"
        }
      })
    ]
  }
});
