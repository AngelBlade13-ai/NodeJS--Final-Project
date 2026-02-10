const bcrypt = require("bcryptjs");
const User = require("../models/User");

function getRegister(req, res) {
  res.render("register", { title: "Register", error: null });
}

async function postRegister(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.render("register", {
      title: "Register",
      error: "Email and password are required.",
    });
  }

  try {
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.render("register", {
        title: "Register",
        error: "Email is already registered.",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email: email.toLowerCase(), passwordHash });

    req.session.user = { id: user._id, email: user.email };
    return res.redirect("/");
  } catch (err) {
    return res.render("register", {
      title: "Register",
      error: "Could not create account. Check database connection.",
    });
  }
}

function getLogin(req, res) {
  res.render("login", { title: "Login", error: null });
}

async function postLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.render("login", {
      title: "Login",
      error: "Email and password are required.",
    });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.render("login", {
        title: "Login",
        error: "Invalid credentials.",
      });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return res.render("login", {
        title: "Login",
        error: "Invalid credentials.",
      });
    }

    req.session.user = { id: user._id, email: user.email };
    return res.redirect("/");
  } catch (err) {
    return res.render("login", {
      title: "Login",
      error: "Could not log in. Check database connection.",
    });
  }
}

function postLogout(req, res) {
  req.session.destroy(() => {
    res.redirect("/");
  });
}

module.exports = {
  getRegister,
  postRegister,
  getLogin,
  postLogin,
  postLogout,
};
