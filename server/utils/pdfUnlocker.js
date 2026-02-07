const { exec } = require("child_process");
const path = require("path");

/**
 * Unlock PDF (remove security / permission password)
 * Works WITHOUT asking password
 * 
 * @param {string} inputPdfPath - Path of uploaded PDF
 * @returns {Promise<string>} - Path of unlocked PDF
 */
const unlockPdf = (inputPdfPath) => {
  return new Promise((resolve, reject) => {
    if (!inputPdfPath) {
      return reject(new Error("PDF path is required"));
    }

    const outputPdfPath = inputPdfPath.replace(
      /\.pdf$/i,
      "_unlocked.pdf"
    );

    const command = `qpdf --decrypt "${inputPdfPath}" "${outputPdfPath}"`;

    exec(command, (error) => {
      if (error) {
        return reject(
          new Error(
            "PDF could not be unlocked. It may require a user password."
          )
        );
      }

      resolve(outputPdfPath);
    });
  });
};

module.exports = unlockPdf;
