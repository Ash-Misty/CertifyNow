import express from "express";
import Certificate from "../models/Certificate.js";

const router = express.Router();

router.get("/verify/:certificateId", async (req, res) => {
  const cert = await Certificate.findOne({
    certificateId: req.params.certificateId
  });

  if (!cert || cert.status !== "generated") {
    return res.json({ valid: false });
  }

  res.json({
    valid: true,
    studentData: cert.studentData,
    issueDate: cert.issueDate
  });
});

export default router;
