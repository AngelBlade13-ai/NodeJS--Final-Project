const Favorite = require("../models/Favorite");

async function getFavorites(req, res) {
  const userId = req.session.user.id;
  const favorites = await Favorite.find({ userId }).sort({ createdAt: -1 });

  res.render("favorites", {
    title: "Your Favorites",
    favorites,
  });
}

async function addFavorite(req, res) {
  const userId = req.session.user.id;
  const { movieId, title, posterPath, releaseDate } = req.body;

  if (!movieId || !title) {
    return res.redirect("/movies/search");
  }

  try {
    await Favorite.create({
      userId,
      movieId,
      title,
      posterPath: posterPath || "",
      releaseDate: releaseDate || "",
    });
  } catch (err) {
    // ignore duplicate favorites
  }

  return res.redirect(`/movies/${movieId}`);
}

async function removeFavorite(req, res) {
  const userId = req.session.user.id;
  const { movieId } = req.body;

  if (movieId) {
    await Favorite.deleteOne({ userId, movieId });
  }

  return res.redirect("/favorites");
}

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite,
};
