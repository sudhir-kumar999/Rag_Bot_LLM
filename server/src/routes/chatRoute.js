import express from "express";
import { chatWithDocs } from "../controllers/chatController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, chatWithDocs);

export default router;