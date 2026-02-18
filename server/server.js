const express = require("express");
const uploadRoutes = require("./routes/uploadRoutes");
require("dotenv").config();

const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://personal-finance-tracking-app.vercel.app"
  ],
  credentials: true,
}));



app.use(express.json());

// Health Route (Recommended)
app.get("/", (req, res) => {
  res.json({ status: "Finance Backend Running 🚀" });
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/upload", uploadRoutes);  // consistency ke liye change

// 404 Handler (Recommended)
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.log(err));
