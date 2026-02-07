const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const XLSX = require("xlsx");

const router = express.Router();

// ================= MULTER CONFIG =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ================= SMART EXCEL PARSER =================
const parseExcel = (filePath) => {
  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  // 👇 get raw rows (array of arrays)
  const rows = XLSX.utils.sheet_to_json(sheet, {
    header: 1,
    defval: "",
  });

  // 👇 detect header row dynamically
  const headerRowIndex = rows.findIndex(row =>
    row.some(cell =>
      String(cell).toLowerCase().includes("s.no") ||
      String(cell).toLowerCase().includes("date")
    )
  );

  if (headerRowIndex === -1) {
    throw new Error("Main table header not found in Excel");
  }

  // 👇 extract headers
  const headers = rows[headerRowIndex].map(h =>
    String(h).trim()
  );

  // 👇 extract only table rows (below header)
  const dataRows = rows.slice(headerRowIndex + 1);

  // 👇 convert rows → objects
  const tableData = dataRows
    .filter(row => row.some(cell => cell !== "")) // remove empty rows
    .map(row => {
      const obj = {};
      headers.forEach((key, i) => {
        obj[key || `col_${i}`] = row[i] ?? "";
      });
      return obj;
    });

  return tableData;
};

// ================= ROUTE =================
router.post("/", upload.single("file"), async (req, res) => {
  console.log("👉 Route hit");

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file received",
    });
  }

  try {
    const ext = path.extname(req.file.originalname).toLowerCase();

    if (ext !== ".xls" && ext !== ".xlsx") {
      return res.status(400).json({
        success: false,
        message: "Only Excel files are allowed",
      });
    }

    console.log("👉 Excel file:", req.file.originalname);

    const data = parseExcel(req.file.path);

    console.log("👉 Parsed rows:", data.length);

    // optional: save parsed output
    fs.writeFileSync(
      "parsed_excel.json",
      JSON.stringify(data, null, 2),
      "utf-8"
    );

    res.status(200).json({
      success: true,
      message: "Excel parsed successfully",
      totalRows: data.length,
      data,
    });

  } catch (err) {
    console.error("❌ Excel parse error:", err.message);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;
