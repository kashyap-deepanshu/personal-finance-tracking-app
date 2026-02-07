const express = require("express");
const healthRoutes = require("./routes/healthRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const cors = require("cors");

const app = express();
const PORT = 5000;
app.use(cors({
  origin: "http://localhost:5173",
}));
app.use(express.json());

// routes
app.use("/health", healthRoutes);
app.use("/upload", uploadRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
