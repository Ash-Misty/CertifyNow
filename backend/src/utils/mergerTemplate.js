
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const mergeTemplate = (templateName, student, settings, issueDate) => {
  // 🔹 Correct path to src/templates
  const templatePath = path.join(__dirname, "..", "templates", `${templateName}.html`);

  // Check if template exists
  if (!fs.existsSync(templatePath)) {
    throw new Error("Template file NOT FOUND: " + templatePath);
  }

  let html = fs.readFileSync(templatePath, "utf-8");

  // 🔹 Replace student fields (Excel headers must match template placeholders)
  Object.entries(student).forEach(([key, value]) => {
    html = html.replaceAll(`{{${key}}}`, value || "");
  });

  // 🔹 Replace issueDate placeholder
  html = html.replaceAll(
    "{{issueDate}}",
    issueDate ? new Date(issueDate).toDateString() : new Date().toDateString()
  );

  // 🔹 Replace company/admin settings
  html = html
    .replaceAll("{{companyName}}", settings.companyName || "")
    .replaceAll("{{companyAddress}}", settings.companyAddress || "")
    .replaceAll("{{authorizedBy}}", settings.authorizedBy || "")
    .replaceAll("{{logo}}", settings.logo || "")
    .replaceAll("{{signature}}", settings.signature || "");

  return html;
};

export default mergeTemplate;