

import express from "express";
import protect from "../middlewares/authMiddleware.js";
import Certificate from "../models/Certificate.js";
import CertificateSettings from "../models/CertificateSettings.js";
import mergeTemplate from "../utils/mergerTemplate.js";
import generatePDF from "../utils/generatePDF.js";

const router = express.Router();

router.post("/generate", protect, async (req, res) => {
  try {
    // 1️ Fetch admin certificate settings
    const settings = await CertificateSettings.findOne({ createdBy: req.adminId });

    if (!settings) {
      return res.status(400).json({
        message: "Certificate settings not found. Please set them first."
      });
    }

    // 2️ Fetch all pending certificates
    const certificates = await Certificate.find({ status: "pending" });

    if (certificates.length === 0) {
      return res.json({ message: "No pending certificates to generate." });
    }

    let successCount = 0;
    const failedCertificates = [];

    // 3️Generate each certificate
    for (const cert of certificates) {
      try {
        console.log("Generating certificate:", cert.certificateId);

        // Merge template with studentData, settings, and issueDate
        const html = mergeTemplate(cert.templateUsed, cert.studentData, settings, new Date());

        // Generate PDF
        const pdfPath = await generatePDF(html, cert.certificateId);

        // Update certificate in DB
        cert.pdfPath = pdfPath;
        cert.status = "generated";
        cert.issueDate = new Date();
        await cert.save();

        console.log("✅ Generated:", cert.certificateId);
        successCount++;
      } catch (err) {
        console.error("❌ Failed for certificate:", cert.certificateId, err.message);
        failedCertificates.push(cert.certificateId);
      }
    }

    // 4️Return result
    res.json({
      message: `Certificates generation completed.`,
      total: certificates.length,
      success: successCount,
      failed: failedCertificates
    });
  } catch (err) {
    console.error("Generate route error:", err.message);
    res.status(500).json({ message: "Server error while generating certificates." });
  }
});

export default router;