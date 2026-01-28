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
  const certificateId =
    row.certificateId ||
    row["Certificate ID"] ||
    row["certificate_id"];

  const studentName =
    row.studentName ||
    row["Student Name"] ||
    row["student_name"];

  const domain = row.domain || row["Domain"];
  const grade = row.grade || row["Grade"];

  if (!certificateId || !studentName) continue;

  const exists = await Certificate.findOne({
    certificateId,
    createdBy: req.adminId,
  });

  if (exists) continue;

  await Certificate.create({
    certificateId,
    studentName,
    domain,
    grade,
    studentData: row,
    templateUsed: "template1",
    status: "pending",
    issueDate: null,
    pdfPath: null,
    createdBy: req.adminId,
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
