const Favorite = require("../models/Favorite");
const User = require("../models/User");

async function getProfile(req, res) {
  const userId = req.session.user.id;
  const user = await User.findById(userId);
  const count = await Favorite.countDocuments({ userId });

  res.render("profile", {
    title: "Profile",
    user,
    count,
  });
}

async function updateProfile(req, res) {
  const userId = req.session.user.id;
  const { likes } = req.body;

  await User.findByIdAndUpdate(userId, {
    likes: (likes || "").trim(),
  });

  return res.redirect("/profile");
}

module.exports = {
  getProfile,
  updateProfile,
};
