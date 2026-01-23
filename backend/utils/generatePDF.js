import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

const generatePDF = async (html, certificateId) => {
  const browser = await puppeteer.launch({
    headless: "new"
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const dir = path.join("certificates");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  const filePath = path.join(dir, `${certificateId}.pdf`);

  await page.pdf({
    path: filePath,
    format: "A4",
    printBackground: true
  });

  await browser.close();

  return filePath;
};

export default generatePDF;
