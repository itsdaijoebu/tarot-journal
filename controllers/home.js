const User = require("../models/User")
const Card = require("../models/Card")

module.exports = {
  getIndex: (req, res) => {
    res.render('index.ejs');
  },
  // getSignup: (req, res) => {
  //   res.render("signup.ejs");
  // },
  // getSignin: (req, res) => {
  //   res.render("signin.ejs");
  // },
};
