// // 👇 FORCE dotenv to load backend/.env
// import path from "path";
// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// import dotenv from "dotenv";
// const app = require("./app.js");
// const connectDB = require("./config/db.js");

// connectDB();

// const PORT = process.env.PORT || 5000;
// import authRoutes from "./routes/auth.js";
// import excelUploadRoute from "./routes/excelUpload.js";
// import generateRoute from "./routes/generateCertificates.js";
// import downloadRoute from "./routes/download.js";
// import settingsRoutes from "./routes/settings.js";
// import verifyRoute from "./routes/verify.js";
// app.use("/api/auth", authRoutes);
// app.use("/api/admin", excelUploadRoute);
// app.use("/api/admin", generateRoute);
// app.use("/api/admin", settingsRoutes);
// app.use("/api/certificate", downloadRoute);
// app.use("/api/certificate", verifyRoute);
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import authRoutes from "./routes/auth.js";
import excelUploadRoute from "./routes/excelUpload.js";
import generateRoute from "./routes/generateCertificates.js";
import downloadRoute from "./routes/download.js";
import settingsRoutes from "./routes/settings.js";
import verifyRoute from "./routes/verify.js";

// DB
import connectDB from "./config/db.js";

// ---------------- ES MODULE FIX ----------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------------- ENV ----------------
dotenv.config({ path: path.join(__dirname, "../.env") });

// ---------------- APP ----------------
const app = express();
app.use(express.json());

// ---------------- DB ----------------
connectDB();

// ---------------- ROUTES ----------------
app.use("/api/auth", authRoutes);
app.use("/api/admin", excelUploadRoute);
app.use("/api/admin", generateRoute);
app.use("/api/admin", settingsRoutes);
app.use("/api/certificate", downloadRoute);
app.use("/api/certificate", verifyRoute);

// ---------------- SERVER ----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
