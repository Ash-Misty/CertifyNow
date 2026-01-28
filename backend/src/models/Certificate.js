
import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    studentName: String,
    certificateId: { type: String, unique: true },
    domain: String,
    grade: String,
    studentData: Object,
    templateUsed: String,
    pdfPath: String,
    issueDate: Date,
    status: {
      type: String,
      enum: ["pending", "generated"],
      default: "pending",
    },
      createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true
  }
  },
  { timestamps: true }
);

export default mongoose.model("Certificate", certificateSchema);