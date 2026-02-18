const express = require("express");
const uploadRoutes = require("./routes/uploadRoutes");
require("dotenv").config();

const cors = require("cors");
const router = express.Router();
const mongoose = require("mongoose");



const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const { protect } = require("./middleware/authMiddleware");

router.get("/dashboard", protect, (req, res) => {
  res.json({ message: "Welcome", user: req.user });
});

app.use(cors({
  // origin: "http://localhost:5173",
  origin:"*",
}));

app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

app.use("/upload", uploadRoutes);

