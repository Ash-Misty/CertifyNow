import fs from "fs";
import path from "path";

const mergeTemplate = (templateName, student, settings) => {
  let html = fs.readFileSync(
    path.join("templates", `${templateName}.html`),
    "utf-8"
  );

  Object.entries(student).forEach(([key, value]) => {
    html = html.replaceAll(`{{student.${key}}}`, value);
  });

  html = html
    .replaceAll("{{companyName}}", settings.companyName)
    .replaceAll("{{companyAddress}}", settings.companyAddress)
    .replaceAll("{{authorizedBy}}", settings.authorizedBy)
    .replaceAll("{{logo}}", settings.logo)
    .replaceAll("{{signature}}", settings.signature);

  return html;
};

export default mergeTemplate;