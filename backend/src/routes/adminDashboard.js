// import express from "express";
// import { getDashboardData } from "../controllers/adminDashboardController.js";
// import protect from "../middlewares/authMiddleware.js";

// const router = express.Router();

// router.get("/dashboard", protect, getDashboardData);
// router.get("/certificates", protect, getDashboardData); // reuse same data

// export default router;

import express from "express";
import protect from "../middlewares/authMiddleware.js";
import Certificate from "../models/Certificate.js";

const router = express.Router();

router.get("/dashboard", protect, async (req, res) => {
  try {
    const adminId = req.adminId;

    const total = await Certificate.countDocuments({ createdBy: adminId });
    const pending = await Certificate.countDocuments({ createdBy: adminId, status: "pending" });
    const allocated = await Certificate.countDocuments({ createdBy: adminId, status: "allocated" });
    const verified = await Certificate.countDocuments({ createdBy: adminId, status: "verified" });

    const recentCertificates = await Certificate.find({ createdBy: adminId })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      stats: { total, pending, allocated, verified },
      certificates: recentCertificates
    });
  } catch (err) {
    res.status(500).json({ message: "Dashboard fetch failed" });
  }
});

export default router;
