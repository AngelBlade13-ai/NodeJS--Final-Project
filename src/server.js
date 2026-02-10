const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const session = require("express-session");

const homeController = require("./controllers/homeController");
const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const profileRoutes = require("./routes/profileRoutes");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "..", "public"), { index: false }));
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "dev_secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

app.use("/auth", authRoutes);
app.use("/movies", movieRoutes);
app.use("/favorites", favoriteRoutes);
app.use("/profile", profileRoutes);
app.use("/admin", adminRoutes);

app.get("/", homeController.getHome);

app.use((req, res) => {
  res.status(404).render("notfound", { title: "Not Found" });
});

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
