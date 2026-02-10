const express = require("express");
const profileController = require("../controllers/profileController");
const { requireAuth } = require("../middleware/requireAuth");

const router = express.Router();

router.get("/", requireAuth, profileController.getProfile);

module.exports = router;
