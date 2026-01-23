import express from "express";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/generate", protect, (req, res) => {
  res.json({ message: "Certificate generated" });
});

export default router;
