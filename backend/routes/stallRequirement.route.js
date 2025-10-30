import { Router } from "express";
import { createStallRegistration } from "../controllers/stallRegistration.controller.js";

const router = Router();

// Route to handle creating a new message
router.post("/registerStall", createStallRegistration);

export default router;