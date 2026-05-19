import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import advertRoutes from "./routes/advertRoute.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/adverts", advertRoutes);

export default app;