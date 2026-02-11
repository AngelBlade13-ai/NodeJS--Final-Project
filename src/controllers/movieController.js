const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const fetch =
  global.fetch ||
  ((...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args)));
const Favorite = require("../models/Favorite");

function getApiKey() {
  return process.env.TMDB_API_KEY || "";
}

async function searchMovies(req, res) {
  const query = (req.query.query || "").trim();
  const page = Number(req.query.page || 1);
  const apiKey = getApiKey();
  const userId = req.session.user.id;

  if (!apiKey) {
    return res.render("results", {
      title: "Search Results",
      query,
      results: [],
      page: 1,
      totalPages: 1,
      error: "TMDB_API_KEY is not set.",
    });
  }

  if (!query) {
    return res.render("results", {
      title: "Search Results",
      query,
      results: [],
      page: 1,
      totalPages: 1,
      error: "Enter a search term.",
    });
  }

  try {
    const url = `${TMDB_BASE_URL}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();
    const favorites = await Favorite.find({ userId }).select("movieId");
    const favoriteIds = new Set(favorites.map((f) => f.movieId));

    return res.render("results", {
      title: "Search Results",
      query,
      results: data.results || [],
      favoriteIds,
      page: data.page || page,
      totalPages: data.total_pages || 1,
      error: null,
    });
  } catch (err) {
    return res.render("results", {
      title: "Search Results",
      query,
      results: [],
      page: 1,
      totalPages: 1,
      error: "Could not fetch results.",
    });
  }
}

async function getMovieDetails(req, res) {
  const apiKey = getApiKey();
  const movieId = req.params.id;
  const userId = req.session.user.id;

  if (!apiKey) {
    return res.render("movie", {
      title: "Movie Details",
      movie: null,
      isFavorite: false,
      error: "TMDB_API_KEY is not set.",
    });
  }

  try {
    const url = `${TMDB_BASE_URL}/movie/${movieId}?api_key=${apiKey}`;
    const response = await fetch(url);
    const movie = await response.json();
    const isFavorite = await Favorite.exists({ userId, movieId });

    return res.render("movie", {
      title: movie.title || "Movie Details",
      movie,
      isFavorite: Boolean(isFavorite),
      error: null,
    });
  } catch (err) {
    return res.render("movie", {
      title: "Movie Details",
      movie: null,
      isFavorite: false,
      error: "Could not load movie details.",
    });
  }
}

module.exports = {
  searchMovies,
  getMovieDetails,
};
