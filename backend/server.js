// // // // // 👇 FORCE dotenv to load backend/.env
// // // // import path from "path";
// // // // import { fileURLToPath } from "url";
// // // // const __filename = fileURLToPath(import.meta.url);
// // // // const __dirname = path.dirname(__filename);

// // // // import dotenv from "dotenv";
// // // // const app = require("./app.js");
// // // // const connectDB = require("./config/db.js");

// // // // connectDB();

// // // // const PORT = process.env.PORT || 5000;
// // // // import authRoutes from "./routes/auth.js";
// // // // import excelUploadRoute from "./routes/excelUpload.js";
// // // // import generateRoute from "./routes/generateCertificates.js";
// // // // import downloadRoute from "./routes/download.js";
// // // // import settingsRoutes from "./routes/settings.js";
// // // // import verifyRoute from "./routes/verify.js";
// // // // app.use("/api/auth", authRoutes);
// // // // app.use("/api/admin", excelUploadRoute);
// // // // app.use("/api/admin", generateRoute);
// // // // app.use("/api/admin", settingsRoutes);
// // // // app.use("/api/certificate", downloadRoute);
// // // // app.use("/api/certificate", verifyRoute);
// // // // app.listen(PORT, () => {
// // // //   console.log(`Server running on port ${PORT}`);
// // // // });

// // // import express from "express";
// // // import dotenv from "dotenv";
// // // import path from "path";
// // // import { fileURLToPath } from "url";

// // // // Routes
// // // import authRoutes from "./src/routes/auth.js";
// // // import excelUploadRoute from "./src/routes/excelUpload.js";
// // // import generateRoute from "./src/routes/generateCertificates.js";
// // // import downloadRoute from "./src/routes/download.js";
// // // import settingsRoutes from "./src/routes/settings.js";
// // // import verifyRoute from "./src/routes/verify.js";

// // // // DB
// // // import connectDB from "./src/config/db.js";

// // // // ---------------- ES MODULE FIX ----------------
// // // const __filename = fileURLToPath(import.meta.url);
// // // const __dirname = path.dirname(__filename);

// // // // ---------------- ENV ----------------
// // // dotenv.config({ path: path.join(__dirname, "../.env") });

// // // // ---------------- APP ----------------
// // // const app = express();
// // // app.use(express.json());

// // // // ---------------- DB ----------------
// // // connectDB();

// // // // ---------------- ROUTES ----------------
// // // app.use("/api/auth", authRoutes);
// // // app.use("/api/admin", excelUploadRoute);
// // // app.use("/api/admin", generateRoute);
// // // app.use("/api/admin", settingsRoutes);
// // // app.use("/api/certificate", downloadRoute);
// // // app.use("/api/certificate", verifyRoute);

// // // // ---------------- SERVER ----------------
// // // const PORT = process.env.PORT || 5000;
// // // app.listen(PORT, () => {
// // //   console.log(`Server running on port ${PORT}`);
// // // // });
// // // import dotenv from "dotenv";
// // // import path from "path";
// // // import { fileURLToPath } from "url";
// // // import app from "./app.js";

// // // // Routes
// // // import authRoutes from "./src/routes/auth.js";
// // // import excelUploadRoute from "./src/routes/excelUpload.js";
// // // import generateRoute from "./src/routes/generateCertificates.js";
// // // import downloadRoute from "./src/routes/download.js";
// // // import settingsRoutes from "./src/routes/settings.js";
// // // import verifyRoute from "./src/routes/verify.js";

// // // // DB
// // // import connectDB from "./src/config/db.js";

// // // // ES module dirname fix
// // // const __filename = fileURLToPath(import.meta.url);
// // // const __dirname = path.dirname(__filename);

// // // // ENV
// // // dotenv.config({ path: path.join(__dirname, "../.env") });

// // // // DB connect
// // // connectDB();

// // // // Routes
// // // app.use("/api/auth", authRoutes);
// // // app.use("/api/admin", excelUploadRoute);
// // // app.use("/api/admin", generateRoute);
// // // app.use("/api/admin", settingsRoutes);
// // // app.use("/api/certificate", downloadRoute);
// // // app.use("/api/certificate", verifyRoute);

// // // // Server
// // // const PORT = process.env.PORT || 5000;
// // // app.listen(PORT, () => {
// // //   console.log(`🚀 Server running on port ${PORT}`);
// // // });
// // import dotenv from "dotenv";
// // import path from "path";
// // import { fileURLToPath } from "url";
// // import app from "./app.js";

// // // Routes
// // import authRoutes from "./src/routes/auth.js";
// // import excelUploadRoute from "./src/routes/excelUpload.js";
// // import generateRoute from "./src/routes/generateCertificates.js";
// // import downloadRoute from "./src/routes/download.js";
// // import settingsRoutes from "./src/routes/settings.js";
// // import verifyRoute from "./src/routes/verify.js";

// // // DB
// // import connectDB from "./src/config/db.js";

// // // ES module dirname fix
// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = path.dirname(__filename);

// // // ENV ✅ FIXED
// // dotenv.config(); // <-- THIS IS ENOUGH

// // // Debug (remove later)
// // console.log("MONGO_URI =", process.env.MONGO_URI);
// // console.log("JWT_SECRET =", process.env.JWT_SECRET);

// // // DB connect
// // connectDB();

// // // Routes
// // app.use("/api/auth", authRoutes);
// // app.use("/api/admin", excelUploadRoute);
// // app.use("/api/admin", generateRoute);
// // app.use("/api/admin", settingsRoutes);
// // app.use("/api/certificate", downloadRoute);
// // app.use("/api/certificate", verifyRoute);

// // // Server
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`🚀 Server running on port ${PORT}`);
// // });
// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";
// import app from "./app.js";

// // ==================== ROUTES ====================
// import authRoutes from "./src/routes/auth.js";
// import adminAuthRoutes from "./src/routes/auth.js"; // ✅ ADMIN LOGIN / REGISTER
// import excelUploadRoute from "./src/routes/excelUpload.js";
// import generateRoute from "./src/routes/generateCertificates.js";
// import downloadRoute from "./src/routes/download.js";
// import settingsRoutes from "./src/routes/settings.js";
// import verifyRoute from "./src/routes/verify.js";
// import adminDashboardRoutes from "./src/routes/adminDashboard.js";

// // ==================== DB ====================
// import connectDB from "./src/config/db.js";

// // ==================== ES MODULE FIX ====================
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // ==================== ENV ====================
// dotenv.config();

// // Optional debug (remove later)
// console.log("MONGO_URI =", process.env.MONGO_URI);
// console.log("JWT_SECRET =", process.env.JWT_SECRET);

// // ==================== DB CONNECT ====================
// connectDB();

// // ==================== ROUTES MOUNT ====================

// // General auth (if any)
// app.use("/api/auth", authRoutes);

// // 🔐 ADMIN AUTH (LOGIN / REGISTER)  ✅ THIS FIXES YOUR ERROR
// app.use("/api/admin", adminAuthRoutes);

// // Admin features
// app.use("/api/admin", adminDashboardRoutes);
// app.use("/api/admin", excelUploadRoute);
// app.use("/api/admin", generateRoute);
// app.use("/api/admin", settingsRoutes);

// // Certificate routes
// app.use("/api/certificate", downloadRoute);
// app.use("/api/certificate", verifyRoute);

// // ==================== SERVER ====================
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });
// import dotenv from "dotenv";
// import app from "./app.js";
// import connectDB from "./src/config/db.js";

// import authRoutes from "./src/routes/auth.js";
// import adminDashboardRoutes from "./src/routes/adminDashboard.js";
// import excelUploadRoute from "./src/routes/excelUpload.js";
// import generateRoute from "./src/routes/generateCertificates.js";
// import downloadRoute from "./src/routes/download.js";
// import settingsRoutes from "./src/routes/settings.js";
// import verifyRoute from "./src/routes/verify.js";

// dotenv.config();
// connectDB();
// app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/api/admin", adminDashboardRoutes);
// app.use("/api/admin", excelUploadRoute);
// app.use("/api/admin", generateRoute);
// app.use("/api/admin", settingsRoutes);

// app.use("/api/certificate", downloadRoute);
// app.use("/api/certificate", verifyRoute);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));

import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import cors from "cors";


// Routes
import authRoutes from "./src/routes/auth.js";
import adminDashboardRoutes from "./src/routes/adminDashboard.js";
import excelUploadRoute from "./src/routes/excelUpload.js";
import generateRoute from "./src/routes/generateCertificates.js";
import downloadRoute from "./src/routes/download.js";
import settingsRoutes from "./src/routes/settings.js";
import verifyRoute from "./src/routes/verify.js";


// Load env
dotenv.config();

// App init
const app = express();
app.use(cors({
  origin: "http://localhost:8080",
  credentials: true
}));

// Middleware
app.use(express.json());

// DB
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminDashboardRoutes);
app.use("/api/admin", excelUploadRoute);
app.use("/api/admin", generateRoute);
app.use("/api/admin", settingsRoutes);

app.use("/api/certificate", downloadRoute);
app.use("/api/certificate", verifyRoute);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
