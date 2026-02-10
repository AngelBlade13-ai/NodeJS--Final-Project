const express = require("express");
const movieController = require("../controllers/movieController");
const { requireAuth } = require("../middleware/requireAuth");

const router = express.Router();

router.get("/search", requireAuth, movieController.searchMovies);
router.get("/:id", requireAuth, movieController.getMovieDetails);

module.exports = router;
