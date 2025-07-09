import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import staticRoutes from "./staticRoutes";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(staticRoutes);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/favicon.ico', (_req, res) => {
  try {
    const iconPath = path.join(__dirname, '../client/public/favicon.ico');
    const icon = fs.readFileSync(iconPath);
    res.setHeader('Content-Type', 'image/x-icon');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(icon);
  } catch {
    res.status(404).send('Not found');
  }
});

app.get('/favicon-32x32.png', (_req, res) => {
  try {
    const iconPath = path.join(process.cwd(), 'client/public/favicon-32x32.png');
    const icon = fs.readFileSync(iconPath);
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(icon);
  } catch {
    res.status(404).send('Not found');
  }
});

app.get('/apple-touch-icon.png', (_req, res) => {
  try {
    const iconPath = path.join(__dirname, '../client/public/apple-touch-icon.png');
    const icon = fs.readFileSync(iconPath);
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(icon);
  } catch {
    res.status(404).send('Not found');
  }
});

app.use((req, res, next) => {
  if (process.env.REPLIT_DOMAINS) return next();

  const host = req.headers.host || '';
  const userAgent = req.headers['user-agent'] || '';

  if (!host.startsWith('www.') && host.includes('.') &&
      !host.startsWith('localhost') &&
      !/^(\d{1,3}\.){3}\d{1,3}/.test(host)) {
    const protocol = req.headers['x-forwarded-proto'] || req.protocol;
    const newUrl = `${protocol}://www.${host}${req.originalUrl}`;
    const statusCode = userAgent.includes('Chrome') ? 307 : 301;

    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');

    if (userAgent.includes('Chrome')) {
      res.setHeader('Clear-Site-Data', '"cache", "cookies", "storage"');
    }

    return res.redirect(statusCode, newUrl);
  }

  next();
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      if (logLine.length > 80) logLine = logLine.slice(0, 79) + "…";
      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.get('/googlee964abc67dc1d83e.html', (_req, res) => {
    res.type('text/html');
    res.send('google-site-verification: googlee964abc67dc1d83e.html');
  });

  app.get('/sitemap.xml', (_req, res) => {
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   <url><loc>https://celiadunsmorecounselling.com.au/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>
   <url><loc>https://celiadunsmorecounselling.com.au/about</loc></url>
   <url><loc>https://celiadunsmorecounselling.com.au/services</loc></url>
   <url><loc>https://celiadunsmorecounselling.com.au/contact</loc></url>
</urlset>`;
    res.type('text/xml');
    res.setHeader('Cache-Control', 'no-cache');
    res.send(sitemapContent);
  });

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });

  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);

    // ✅ Fallback: serve index.html for all unknown GET requests (React SPA)
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`🚀 Serving on port ${port}`);
  });
})();