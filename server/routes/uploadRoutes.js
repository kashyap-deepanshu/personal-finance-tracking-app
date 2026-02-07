const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const router = express.Router();
const extractTransactions =require("../services/extractTransaction")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// router implementation
router.post("/", upload.single("file"), async (req, res) => {
  console.log(" Route hit");

  if (!req.file) {
    console.log(" No file received");
    return res.status(400).json({
      success: false,
      message: "No file received",
    });
  }

  try {
    console.log("File received:", req.file.originalname);

    const filePath = req.file.path;
    const dataBuffer = fs.readFileSync(filePath);

    console.log(" Before pdfParse");
    const pdfData = await pdfParse(dataBuffer, { password: "" });

    console.log(pdfData.text.length);
    console.log(" After pdfParse");
    const transactions = extractTransactions(pdfData.text);
    // console.log(transactions);

    // console.log("Transactions Length "+transactions.length);
    // console.log(pdfData.text);
    fs.writeFileSync("write-ptm.txt", pdfData.text, "utf-8");
    fs.writeFileSync(
      "write-transaction-1-ptm.txt",
      transactions.join("\n"),
        // transactions,
      "utf-8"
    );

    res.status(200).json({
      success: true,
      message: "PDF parsed successfully",
      transactions
    }); 
  } catch (error) {
    console.error(" Pdf parse Error:", error);
    // console.log("error occured");

    res.status(500).json({
      success: false,
      message: "Pdf parse failed",
    });
  }
});

module.exports = router;
