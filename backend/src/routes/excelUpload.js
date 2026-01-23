// import express from "express";
// import xlsx from "xlsx";
// import upload from "../config/multer.js";
// import protect from "../middleware/authMiddleware.js";
// import Certificate from "../models/Certificate.js";

// const router = express.Router();

// router.post(
//   "/upload-excel",
//   protect,
//   upload.single("file"),
//   async (req, res) => {
//     try {
//       const workbook = xlsx.read(req.file.buffer);
//       const sheetName = workbook.SheetNames[0];
//       const sheetData = xlsx.utils.sheet_to_json(
//         workbook.Sheets[sheetName]
//       );

//       for (const row of sheetData) {
//         await Certificate.create({
//           certificateId: row.certificateId,
//           name: row.name,
//           domain: row.domain,
//           startDate: row.startDate,
//           endDate: row.endDate
//         });
//       }

//       res.json({ message: "Excel data uploaded successfully" });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   }
// );

// export default router;


import express from "express";
import xlsx from "xlsx";
import upload from "../config/multer.js";
import protect from "../middlewares/authMiddleware.js"
import Certificate from "../models/Certificate.js";

const router = express.Router();

router.post(
  "/upload-excel",
  protect,
  upload.single("file"),
  async (req, res) => {
    try {
      const workbook = xlsx.read(req.file.buffer);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = xlsx.utils.sheet_to_json(sheet);

      for (const row of rows) {
        const exists = await Certificate.findOne({
          certificateId: row.certificateId
        });

        if (exists) continue; // skip duplicates

        await Certificate.create({
          certificateId: row.certificateId,
          studentData: row,
          templateUsed: "template1"
        });
      }

      res.json({ message: "Excel data stored successfully" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

export default router;
