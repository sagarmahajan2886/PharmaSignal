import express from "express";
import path from "path";
import fs from "fs";
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

      console.log(`Forwarding email subscription: ${email}`);

      // 1. Core Server-side Persistence: Save to subscribers.json as a robust, bulletproof local backup
      const backupPath = path.join(process.cwd(), "subscribers.json");
      let list = [];
      try {
        if (fs.existsSync(backupPath)) {
          list = JSON.parse(fs.readFileSync(backupPath, "utf8"));
        }
      } catch (err) {
        console.error("Error reading subscribers.json backup file:", err);
      }

      // Avoid duplicates in the backup file
      if (!list.some((item: any) => item.email.toLowerCase() === email.toLowerCase())) {
        list.push({ email, timestamp: new Date().toISOString() });
        try {
          fs.writeFileSync(backupPath, JSON.stringify(list, null, 2));
          console.log(`Successfully saved subscriber to local server-side backup: ${email}`);
        } catch (err) {
          console.error("Error writing to subscribers.json backup file:", err);
        }
      }

      // 2. Integration: Forward subscription to Hostinger Reach
      try {
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
          // Return success anyway because we successfully saved the subscriber on our server backup!
          return res.json({ success: true, saved_locally: true, note: "Forward failure" });
        }

        const data = await response.json().catch(() => ({}));
        return res.json({ success: true, data });
      } catch (fetchErr) {
        console.error("Hostinger Reach network fetch error:", fetchErr);
        // Fallback to success because of server-side subscribers.json persistence
        return res.json({ success: true, saved_locally: true, note: "Network fallback" });
      }
    } catch (error: any) {
      console.error("Backend proxy error when processing subscription:", error);
      return res.status(500).json({ error: "Failed to process subscription." });
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
