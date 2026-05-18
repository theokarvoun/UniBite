import express from "express";
import { upload } from "../middleware/uploadMiddleware.js";
import {
  getPosts,
  createPost
} from "../controllers/postController.js";

const router = express.Router();

router.get("/", getPosts);

router.post("/", upload.single("image"), createPost);

export default router;