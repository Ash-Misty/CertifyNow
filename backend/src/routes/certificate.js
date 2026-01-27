
import express from "express";
import protect from "../middlewares/authMiddleware.js";
import Certificate from "../models/Certificate.js";
import CertificateSettings from "../models/CertificateSettings.js";
import mergeTemplate from "../utils/mergeTemplate.js";
import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

const router = express.Router();

router.post("/generate", protect, async (req, res) => {
  const settings = await CertificateSettings.findOne({ createdBy: req.adminId });
  if (!settings) return res.status(400).json({ message: "Settings not found" });

  const certificates = await Certificate.find({ status: "pending" });
  if (!certificates.length) return res.json({ message: "No pending certificates" });

  const browser = await puppeteer.launch({ headless: "new" });

  for (const cert of certificates) {
    const page = await browser.newPage();
    const html = mergeTemplate(cert.templateUsed, cert.studentData, settings);

    await page.setContent(html, { waitUntil: "networkidle0" });

    const dir = "certificates";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    const filePath = path.join(dir, `${cert.certificateId}.pdf`);

    await page.pdf({ path: filePath, format: "A4", printBackground: true });
    await page.close();

    cert.pdfPath = filePath;
    cert.status = "generated";
    cert.issueDate = new Date();
    await cert.save();
  }

  await browser.close();
  res.json({ message: "Certificates generated successfully" });
});

export default router;