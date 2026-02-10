const express = require("express");
const path = require("path");

const app = express();
const helloRoutes = require("./routes/helloRoutes");

const PORT = process.env.PORT || 3000;

// Serve static frontend
app.use(express.static(path.join(__dirname, "..", "public")));

// API routes
app.use("/api", helloRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
