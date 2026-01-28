

// import express from "express";
// import protect from "../middlewares/authMiddleware.js";
// import Certificate from "../models/Certificate.js";
// import CertificateSettings from "../models/CertificateSettings.js";
// import mergeTemplate from "../utils/mergerTemplate.js";
// import generatePDF from "../utils/generatePDF.js";

// const router = express.Router();

// router.post("/generate", protect, async (req, res) => {
//   try {
//     // 1️ Fetch admin certificate settings
//     const settings = await CertificateSettings.findOne({ createdBy: req.adminId });

//     if (!settings) {
//       return res.status(400).json({
//         message: "Certificate settings not found. Please set them first."
//       });
//     }

//     // 2️ Fetch all pending certificates
//     const certificates = await Certificate.find({ status: "pending" });

//     if (certificates.length === 0) {
//       return res.json({ message: "No pending certificates to generate." });
//     }

//     let successCount = 0;
//     const failedCertificates = [];

//     // 3️Generate each certificate
//     for (const cert of certificates) {
//       try {
//         console.log("Generating certificate:", cert.certificateId);

//         // Merge template with studentData, settings, and issueDate
//         const html = mergeTemplate(cert.templateUsed, cert.studentData, settings, new Date());

//         // Generate PDF
//         const pdfPath = await generatePDF(html, cert.certificateId);

//         // Update certificate in DB
//         cert.pdfPath = pdfPath;
//         cert.status = "generated";
//         cert.issueDate = new Date();
//         await cert.save();

//         console.log("✅ Generated:", cert.certificateId);
//         successCount++;
//       } catch (err) {
//         console.error("❌ Failed for certificate:", cert.certificateId, err.message);
//         failedCertificates.push(cert.certificateId);
//       }
//     }

//     // 4️Return result
//     res.json({
//       message: `Certificates generation completed.`,
//       total: certificates.length,
//       success: successCount,
//       failed: failedCertificates
//     });
//   } catch (err) {
//     console.error("Generate route error:", err.message);
//     res.status(500).json({ message: "Server error while generating certificates." });
//   }
// });

// export default router;


// import express from "express";
// import protect from "../middlewares/authMiddleware.js";
// import Certificate from "../models/Certificate.js";
// import CertificateSettings from "../models/CertificateSettings.js";
// import mergeTemplate from "../utils/mergeTemplate.js";
// import generatePDF from "../utils/generatePDF.js";

// const router = express.Router();

// router.post("/generate", protect, async (req, res) => {
//   try {
//     // 1️⃣ Fetch settings for THIS admin only
//     const settings = await CertificateSettings.findOne({
//       createdBy: req.adminId
//     });

//     if (!settings) {
//       return res.status(400).json({
//         message: "Certificate settings not found. Please configure settings first."
//       });
//     }

//     // 2️⃣ Fetch ONLY this admin's pending certificates
//     const certificates = await Certificate.find({
//       status: "pending",
//       createdBy: req.adminId
//     });

//     if (certificates.length === 0) {
//       return res.json({
//         message: "No pending certificates to generate."
//       });
//     }

//     let successCount = 0;
//     const failedCertificates = [];

//     // 3️⃣ Generate certificates one by one
//     for (const cert of certificates) {
//       try {
//         console.log("Generating certificate:", cert.certificateId);

//         const issueDate = new Date();

//         // Merge template with admin-specific data
//         const html = mergeTemplate(
//           cert.templateUsed,
//           cert.studentData,
//           settings,
//           issueDate
//         );

//         // Generate PDF
//         const pdfPath = await generatePDF(
//           html,
//           `${req.adminId}_${cert.certificateId}`
//         );

//         // Update certificate
//         cert.pdfPath = pdfPath;
//         cert.status = "generated";
//         cert.issueDate = issueDate;
//         await cert.save();

//         successCount++;
//       } catch (err) {
//         console.error(
//           "❌ Failed for certificate:",
//           cert.certificateId,
//           err.message
//         );
//         failedCertificates.push(cert.certificateId);
//       }
//     }

//     // 4️⃣ Return admin-specific result
//     res.json({
//       message: "Certificate generation completed.",
//       total: certificates.length,
//       success: successCount,
//       failed: failedCertificates
//     });

//   } catch (err) {
//     console.error("Generate route error:", err.message);
//     res.status(500).json({
//       message: "Server error while generating certificates."
//     });
//   }
// });

// export default router;


import express from "express";
import protect from "../middlewares/authMiddleware.js";
import Certificate from "../models/Certificate.js";
import CertificateSettings from "../models/CertificateSettings.js";

import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

const router = express.Router();

router.post("/generate", protect, async (req, res) => {
  try {
    // 1️⃣ Fetch settings ONLY for this admin
    const settings = await CertificateSettings.findOne({
      createdBy: req.adminId
    });

    if (!settings) {
      return res.status(400).json({
        message: "Certificate settings not found"
      });
    }

    // 2️⃣ Fetch ONLY this admin's pending certificates
    const certificates = await Certificate.find({
      status: "pending",
      createdBy: req.adminId
    });

    if (!certificates.length) {
      return res.json({
        message: "No pending certificates"
      });
    }

    // 3️⃣ Launch browser once
    const browser = await puppeteer.launch({ headless: "new" });

    // 4️⃣ Ensure certificates directory exists
    const dir = path.join(process.cwd(), "certificates");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    for (const cert of certificates) {
      const page = await browser.newPage();

      const html = mergeTemplate(
        cert.templateUsed,
        cert.studentData,
        settings
      );

      await page.setContent(html, { waitUntil: "networkidle0" });

      // ✅ UNIQUE FILE NAME (admin-safe)
      const fileName = `${req.adminId}_${cert.certificateId}.pdf`;
      const filePath = path.join(dir, fileName);

      await page.pdf({
        path: filePath,
        format: "A4",
        printBackground: true
      });

      await page.close();

      // 5️⃣ Update certificate
      cert.pdfPath = filePath;
      cert.status = "generated";
      cert.issueDate = new Date();
      await cert.save();
    }

    await browser.close();

    res.json({
      message: "Certificates generated successfully",
      total: certificates.length
    });

  } catch (err) {
    console.error("Generate error:", err.message);
    res.status(500).json({
      message: "Error generating certificates"
    });
  }
});

export default router;
