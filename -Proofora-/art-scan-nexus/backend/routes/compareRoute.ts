import express from "express";
import { compareDesigns } from "../controllers/compareController.ts";

const router = express.Router();

// Route to handle comparison of two design images
router.post("/compare", compareDesigns);

export default router;
