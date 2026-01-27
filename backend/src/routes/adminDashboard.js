import express from "express";
import { getDashboardData } from "../controllers/adminDashboardController.js";
import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/dashboard", protect, getDashboardData);
router.get("/certificates", protect, getDashboardData); // reuse same data

export default router;