const express = require("express");
const favoriteController = require("../controllers/favoriteController");
const { requireAuth } = require("../middleware/requireAuth");

const router = express.Router();

router.get("/", requireAuth, favoriteController.getFavorites);
router.post("/add", requireAuth, favoriteController.addFavorite);
router.post("/remove", requireAuth, favoriteController.removeFavorite);

module.exports = router;
