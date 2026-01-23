import express from "express";
import Certificate from "../models/Certificate.js";
import path from "path";

const router = express.Router();

router.get("/download/:certificateId", async (req, res) => {
  const cert = await Certificate.findOne({
    certificateId: req.params.certificateId
  });

  if (!cert || cert.status !== "generated") {
    return res.status(404).json({ message: "Certificate not found" });
  }

  res.sendFile(path.resolve(cert.pdfPath));
});

export default router;

