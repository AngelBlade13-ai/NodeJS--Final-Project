function requireAuth(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/auth/login");
  }
  return next();
}

function requireAdmin(req, res, next) {
  const adminEmail = (process.env.ADMIN_EMAIL || "").toLowerCase();
  if (!req.session.user || !adminEmail) {
    return res.status(403).render("error", {
      title: "Access Denied",
      message: "Admin access only.",
    });
  }
  if (req.session.user.email.toLowerCase() !== adminEmail) {
    return res.status(403).render("error", {
      title: "Access Denied",
      message: "Admin access only.",
    });
  }
  return next();
}

module.exports = {
  requireAuth,
  requireAdmin,
};
