import { config } from "dotenv";
import { resolve } from "path";

// Load .env.local before anything else
config({ path: resolve(process.cwd(), ".env.local") });

import express from "express";
import type { Request, Response } from "express";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import handler from "./quote.js";

const app = express();
app.use(express.json());

app.all("/api/quote", (req: Request, res: Response) => {
  return handler(req as unknown as VercelRequest, res as unknown as VercelResponse);
});

app.listen(3001, () => {
  console.log("  API server → http://localhost:3001/api/quote");
});
