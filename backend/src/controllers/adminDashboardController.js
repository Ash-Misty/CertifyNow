import Certificate from "../models/Certificate.js";

export const getDashboardData = async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ createdAt: -1 });

    const stats = {
      total: certificates.length,
      allocated: certificates.filter(c => c.status === "allocated").length,
      verified: certificates.filter(c => c.status === "verified").length,
      pending: certificates.filter(c => c.status === "pending").length,
    };

    res.json({
      success: true,
      stats,
      certificates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load dashboard data",
    });
  }
};