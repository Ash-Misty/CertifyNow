
import express from "express";
import Certificate from "../models/Certificate.js";
import path from "path";

const router = express.Router();

router.get("/download/:certificateId", async (req, res) => {
  const cert = await Certificate.findOne({ certificateId: req.params.certificateId });

  if (!cert || cert.status !== "generated") {
    return res.status(404).json({ message: "Certificate not found" });
  }

  const safePath = path.join("certificates", `${cert.certificateId}.pdf`);
  res.sendFile(path.resolve(safePath));
});

export default router;