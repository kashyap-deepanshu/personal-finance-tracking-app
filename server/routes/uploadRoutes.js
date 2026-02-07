const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const pdfParse = require("pdf-parse");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// function for extract transaction
const extractTransactions = (text) => {
  console.log("extract transaction function running");

  const lines = text.split("\n");
  const transactions = [];
  console.log(lines.length);
  console.log("extract transaction function ends");
  // fs.writeFileSync("write-transaction.txt", lines.join("\n"), "utf-8")

  let startingIndex = -1;
  let endingIndex = lines.length;

  lines.forEach((line, index) => {
    const word = line.toLowerCase();

    // detect table start
    if (
      startingIndex === -1 &&
      word.includes("date") &&
      word.includes("description") &&
      (word.includes("balance") || word.includes("amount"))
    ) {
      console.log("Header found at:", index);
      startingIndex = index-1;
      
    }

    // detect table end
    if (startingIndex !== -1 && word.includes("end of statement")) {
      console.log("End found at:", index);
      endingIndex = index;
      return;
    }

    // push only actual transactions
    if (startingIndex !== -1 && index > startingIndex && index < endingIndex) {
      transactions.push(line);
    }
  });

  return transactions;
};

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
    fs.writeFileSync("write.txt", pdfData.text, "utf-8");
    fs.writeFileSync(
      "write-transaction-new.txt",
      transactions.join("\n"),
      "utf-8",
    );

    res.status(200).json({
      success: true,
      message: "PDF parsed successfully",
      // transactions
    });
  } catch (error) {
    // console.error(" Pdf parse Error:", error);
    console.log("error occured");

    res.status(500).json({
      success: false,
      message: "Pdf parse failed",
    });
  }
});

module.exports = router;
