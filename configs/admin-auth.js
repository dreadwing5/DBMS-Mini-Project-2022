module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      if (req.user.role !== "admin") {
        req.flash("error_msg", "Permission denied");
        res.redirect("/admin/login");
      }
      return next();
    }
    req.flash("error_msg", "Please log in to view that resource");
    res.redirect("/admin/login");
  },
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/admin");
  },
};
