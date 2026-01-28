// import mongoose from "mongoose";

// const certificateSettingsSchema = new mongoose.Schema({
//   companyName: String,
//   companyAddress: String,
//   authorizedBy: String,
//   logo: String,       // file path
//   signature: String, // file path
//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Admin"
//   }
// });

// export default mongoose.model(
//   "CertificateSettings",
//   certificateSettingsSchema
// );

import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  companyName: String,
  companyAddress: String,
  authorizedBy: String,
  logo: String,
  signature: String,
   createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin",
    required: true
  }
});

export default mongoose.model("CertificateSettings", settingsSchema);
