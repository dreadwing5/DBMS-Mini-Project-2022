const express = require("express");
const router = express.Router();
const passport = require("passport");
const connection = require("../configs/DBConnection");

const { snakeCase } = require("lodash");

const {
  ensureAuthenticated,
  forwardAuthenticated,
} = require("../configs/admin-auth");

//Admin Panel
router.get("/admin", ensureAuthenticated, function (req, res) {
  res.render("admin/dashboard", {
    title: "Dashboard",
    Username: "admin",
  });
});

//Add User Page
router.get("/add-user", ensureAuthenticated, function (req, res) {
  res.render("admin/add_user", {
    title: "Add User",
    Username: "admin",
  });
});

//Render Add Dropdwon Field
router.get("/admin/add-fields/:field", ensureAuthenticated, (req, res) => {
  let field = snakeCase(req.params.field);
  connection.query(`SELECT * FROM ${field}`, (err, result) => {
    if (err) {
      console.error(err);
      res.send({
        code: 400,
        failed: "error ocurred",
      });
    }

    const results = Object.values(JSON.parse(JSON.stringify(result)));

    //render coe page
    res.render("admin/add_fields", {
      title: field.toUpperCase(),
      fields: results,
      Username: "admin",
    });
  });
});

//Login Page
router.get("/admin/login", function (req, res) {
  res.render("admin/login");
});

//Work in progress
router.get("/admin/roles", (req, res) => {
  res.render("404");
});

router.get("/admin/remove-user", (req, res) => {
  res.render("404");
});

//Login Handle
router.post("/admin/login", (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user || user.role !== "admin") {
      req.flash("success_msg", "You do not have permission");
      return res.redirect("/admin/login");
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.redirect("/admin");
    });
  })(req, res, next);
});

//Logout Handle
router.get("/admin/logout", (req, res) => {
  req.logOut();
  req.flash("success_msg", "You are logged out");
  res.redirect("/admin/login");
});

module.exports = router;
