const User = require("../models/User");
const Card = require("../models/Card");

module.exports = {
  addCard: async (req, res) => {
    try {
      const cards = await Card.find();
      res.render("add-card.ejs", { user: req.user, cards: cards });
    } catch (err) {
      console.log(err);
    }
  },
};
