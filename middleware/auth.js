module.exports = {
  ensureAuth: function (req, res, next) {
    console.log('ensure')
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/");
    }
  },
};
