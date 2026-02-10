const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const helloRoutes = require("./routes/helloRoutes");

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "";

// Serve static frontend
app.use(express.static(path.join(__dirname, "..", "public")));

// API routes
app.use("/api", helloRoutes);

async function startServer() {
  if (!MONGODB_URI) {
    console.warn("MONGODB_URI is not set. Skipping MongoDB connection.");
  } else {
    try {
      await mongoose.connect(MONGODB_URI);
      console.log("MongoDB connected successfully");
    } catch (err) {
      console.error("MongoDB connection error:", err.message);
    }
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
