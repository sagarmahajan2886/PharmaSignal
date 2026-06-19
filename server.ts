import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to parse incoming JSON bodies
  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Proxy route for Hostinger Reach submission
  app.post("/api/subscribe", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email || !email.includes('@')) {
        return res.status(400).json({ error: "Valid email is required." });
      }

      console.log(`Forwarding email subscription to Hostinger Reach: ${email}`);

      const response = await fetch("https://reach.hostinger.com/api/v1/forms/9e6723a1-8c92-43c1-8369-5501a6d91ba1/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Hostinger Reach API returned an error status:", response.status, errorText);
        return res.status(response.status).json({ error: "Hostinger Reach subscription failed" });
      }

      const data = await response.json().catch(() => ({}));
      return res.json({ success: true, data });
    } catch (error: any) {
      console.error("Backend proxy error when forwarding subscription input:", error);
      return res.status(500).json({ error: "Failed to forward subscription info to Hostinger Reach." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
