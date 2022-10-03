const Reading = require("../models/Reading");
const User = require("../models/User");
const Card = require("../models/Card");

module.exports = {
  getReadings: async (req, res) => {
    try {
      const readings = await Reading.find({
        user: new RegExp(`^${req.user.username}$`, "i"),
      });
      res.render("dashboard.ejs", { readings: readings, user: req.user });
      console.log("dashboard controller - readings:", readings);
    } catch (err) {
      console.log(err);
    }
  },
  // addCard: async (req, res) => {
  //   try {
  //     const cards = await Card.find()
  //     res.render("add-card.ejs", {user: req.user, cards: cards});
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  // saveReading: (req, res) => {
  //   res.render('saveReading.ejs')
  // }
};
