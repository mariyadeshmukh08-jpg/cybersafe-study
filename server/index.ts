import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import { askCyberBuddy, normalizeMessages } from "./cyberbuddy";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);
  app.use(express.json({ limit: "32kb" }));

  app.post("/api/cyberbuddy", async (req, res) => {
    try {
      const messages = normalizeMessages(req.body?.messages);
      if (messages.length === 0 || messages.at(-1)?.role !== "user") {
        res.status(400).json({ error: "Please send a user question." });
        return;
      }

      const result = await askCyberBuddy(messages);
      res.json(result);
    } catch (error) {
      console.error("[CyberBuddy] Request failed:", error);
      res.status(500).json({ error: "CyberBuddy is temporarily unavailable." });
    }
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
