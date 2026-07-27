import { defineConfig } from "@solidjs/start/config";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  vite: {
    plugins: [
      VitePWA({
        // SW stays at /_build/sw.js (vinxi asset base). We grant it ROOT scope
        // via the Service-Worker-Allowed header (added in `server.routeRules`
        // below) and register it with scope "/".
        registerType: "prompt",
        injectRegister: null,
        manifestFilename: "manifest.json",
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
          // SSR app: no HTML navigate-fallback needed. Visited pages are cached
          // for offline via runtimeCaching (NetworkFirst). Explicitly disabling
          // navigateFallback overrides the plugin's default "index.html" and
          // avoids workbox's non-precached-url error at SW startup.
          navigateFallback: undefined,
          runtimeCaching: [
            {
              urlPattern: ({ request }) => request.mode === "navigate",
              handler: "NetworkFirst",
              options: {
                cacheName: "pages",
                networkTimeoutSeconds: 3,
                cacheableResponse: { statuses: [0, 200, 301, 302] }
              }
            },
            {
              urlPattern: /\.(?:js|css|woff2?|png|svg|ico)$/,
              handler: "StaleWhileRevalidate",
              options: { cacheName: "assets" }
            }
          ]
        }
      })
    ]
  },
  // Forwarded by vinxi into Nitro's routeRules via createNitro({...server}).
  server: {
    routeRules: {
      "/_build/sw.js": {
        headers: {
          "Service-Worker-Allowed": "/"
        }
      }
    }
  }
});
