const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    movieId: { type: String, required: true },
    title: { type: String, required: true },
    posterPath: { type: String, default: "" },
    releaseDate: { type: String, default: "" },
  },
  { timestamps: true }
);

favoriteSchema.index({ userId: 1, movieId: 1 }, { unique: true });

module.exports = mongoose.model("Favorite", favoriteSchema);
