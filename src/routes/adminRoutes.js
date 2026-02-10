const express = require("express");
const { requireAdmin } = require("../middleware/requireAuth");

const router = express.Router();

router.get("/", requireAdmin, (req, res) => {
  res.render("admin", { title: "Admin" });
});

module.exports = router;
