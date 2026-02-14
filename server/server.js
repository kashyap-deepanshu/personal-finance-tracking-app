const express = require("express");
const uploadRoutes = require("./routes/uploadRoutes");
const cors = require("cors");

const app = express();
const PORT = 5000;
app.use(cors({
  origin: "http://localhost:5173",
}));
app.use(express.json());

// routes
app.use("/upload", uploadRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
