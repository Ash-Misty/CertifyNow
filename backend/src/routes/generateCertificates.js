import express from "express";
import protect from "../middlewares/authMiddleware.js";
import Certificate from "../models/Certificate.js";
import CertificateSettings from "../models/CertificateSettings.js";
import mergeTemplate from "../utils/mergerTemplate.js";
import generatePDF from "../utils/generatePDF.js";

const router = express.Router();

router.post("/generate", protect, async (req, res) => {
  const settings = await CertificateSettings.findOne({
    createdBy: req.adminId
  });

  if (!settings) {
    return res.status(400).json({ message: "Certificate settings not found" });
  }

  const certificates = await Certificate.find({ status: "pending" });

  for (const cert of certificates) {
    const html = mergeTemplate(
      cert.templateUsed,
      cert.studentData,
      settings
    );

    const pdfPath = await generatePDF(html, cert.certificateId);

    cert.pdfPath = pdfPath;
    cert.status = "generated";
    await cert.save();
  }

  res.json({ message: "Certificates generated successfully" });
});

export default router;

