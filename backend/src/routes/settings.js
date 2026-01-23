import express from "express";
import protect from "../middlewares/authMiddleware.js";
import uploadFiles from "../config/uploadFiles.js";
import CertificateSettings from "../models/CertificateSettings.js";

const router = express.Router();

router.post(
  "/settings",
  protect,
  uploadFiles.fields([
    { name: "logo", maxCount: 1 },
    { name: "signature", maxCount: 1 }
  ]),
  async (req, res) => {
    await CertificateSettings.findOneAndUpdate(
      { createdBy: req.adminId },
      {
        companyName: req.body.companyName,
        companyAddress: req.body.companyAddress,
        authorizedBy: req.body.authorizedBy,
        logo: req.files.logo[0].path,
        signature: req.files.signature[0].path,
        createdBy: req.adminId
      },
      { upsert: true }
    );

    res.json({ message: "Settings saved" });
  }
);

export default router;
