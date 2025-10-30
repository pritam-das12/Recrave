import { Router } from "express";
import { createMessage } from "../controllers/message.controller.js";

const router = Router();

// Route to handle creating a new message
router.post("/createMessage", createMessage);

export default router;