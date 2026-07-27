// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#0f172a" />
          <link rel="icon" href="/favicon.png" />
          <link rel="apple-touch-icon" href="/pwa-192x192.png" />
          <link rel="manifest" href="/_build/manifest.json" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          {/* No-flash theme + hue: runs before first paint, mirroring what
              ThemeProvider applies on mount. Keys must match lib/theme.tsx. */}
          <script>{`(function(){try{var h=localStorage.getItem('soliddash:hue');if(h!==null){h=parseInt(h,10);if(!isNaN(h)&&h>=0&&h<=360){document.documentElement.style.setProperty('--hue',String(h));}}var t=localStorage.getItem('soliddash:theme');if(t==='dark'){document.documentElement.classList.add('dark');}}catch(e){}})();`}</script>
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
