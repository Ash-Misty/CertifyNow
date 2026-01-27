
import express from "express";
import xlsx from "xlsx";
import upload from "../config/multer.js";
import protect from "../middlewares/authMiddleware.js";
import Certificate from "../models/Certificate.js";

const router = express.Router();

router.post(
  "/upload-excel",
  protect,
  upload.single("file"),
  async (req, res) => {
    try {
      // 🚨 Check file exists
      if (!req.file) {
        return res.status(400).json({ message: "No Excel file uploaded" });
      }

      // 📖 Read Excel
      const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = xlsx.utils.sheet_to_json(sheet);

      let insertedCount = 0;

      for (const row of rows) {
        // 🚨 Skip if certificateId missing
        if (!row.certificateId) continue;

        const exists = await Certificate.findOne({
          certificateId: row.certificateId,
        });

        if (exists) continue; // skip duplicates

        // ✅ SAVE USING CORRECT SCHEMA FIELDS
        await Certificate.create({
          certificateId: row.certificateId,
          studentName: row.studentName,
          domain: row.domain,
          grade: row.grade,
          studentData: row,
          templateUsed: "template1",
          status: "pending",
          issueDate: null,
          pdfPath: null,
        });

        insertedCount++;
      }

      res.json({
        message: "Excel data stored successfully",
        recordsInserted: insertedCount,
      });
    } catch (err) {
      console.error("Excel Upload Error:", err);
      res.status(500).json({
        message: "Excel processing failed",
        error: err.message,
      });
    }
  }
);

export default router;