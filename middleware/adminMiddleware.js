const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { requireAuth, checkUser } = require("./authMiddleware");

const admins = ["harshitrana09@gmail.com", "harshit16"];

const requireAdmin = (req, res, next) => {
  const token = req.cookies.jwt;
  var found = false;
  if (token) {
    jwt.verify(token, "HR$1606", async (err, decodedToken) => {
      if (err) {
        return res.redirect("/login");
      } else {
        const user = await User.findById(decodedToken.id);
        admins.forEach((admin) => {
          if (admin === user.email) {
            found = true;
            return next();
          }
        });
        if (!found) {
          return res.redirect("/login");
        }
      }
    });
  } else {
    res.redirect("/login");
  }
};

const checkAdmin = (req, res, next) => {
  const token = req.cookies.jwt;
  var found = false;
  if (token) {
    jwt.verify(token, "HR$1606", async (err, decodedToken) => {
      if (err) {
        res.locals.admin = null;
        return next();
      } else {
        const user = await User.findById(decodedToken.id);
        admins.forEach((admin) => {
          if (admin === user.email) {
            found = true;
            res.locals.admin = true;
            return next();
          }
        });
        if (!found) {
          res.locals.admin = null;
          return next();
        }
      }
    });
  } else {
    res.locals.admin = null;
    return next();
  }
};

module.exports = { checkAdmin, requireAdmin };
