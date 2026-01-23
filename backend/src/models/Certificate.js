// import mongoose from "mongoose";

// const certificateSchema = new mongoose.Schema({
//   certificateId: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   name: {
//     type: String,
//     required: true
//   },
//   domain: {
//     type: String,
//     required: true
//   },
//   startDate: String,
//   endDate: String,
//   issueDate: {
//     type: Date,
//     default: Date.now
//   }
// });

// export default mongoose.model("Certificate", certificateSchema);

import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  certificateId: {
    type: String,
    required: true,
    unique: true
  },

  // 🔥 Dynamic student data
  studentData: {
    type: Object,
    required: true
  },

  // 🔥 Which template was used
  templateUsed: {
    type: String,
    default: "template1"
  },

  // 🔥 Generated PDF path
  pdfPath: {
    type: String
  },

  issueDate: {
    type: Date,
    default: Date.now
  },
  status: {
  type: String,
  enum: ["pending", "generated"],
  default: "pending"
}

});

export default mongoose.model("Certificate", certificateSchema);
