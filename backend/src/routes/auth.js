import express from "express";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // 🔥 THIS IS WHERE PASSWORD HASHING GOES
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save admin
    const admin = new Admin({
      email,
      password: hashedPassword
    });

    await admin.save();

    res.status(201).json({ message: "Admin registered successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
