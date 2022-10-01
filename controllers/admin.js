const User = require("../models/User");
const Card = require("../models/Card");
const CardImage = require("../models/CardImage")

module.exports = {
  editCollection: async (req, res) => {
    try {
      const cards = await Card.find();
      res.render("edit-collection.ejs", { user: req.user, cards: cards });
    } catch (err) {
      console.log(err);
    }
  },
  addCard: async (req, res) => {
    try {
      let arcana = req.body.isMajorArcana ? true : false
      console.log(arcana)
      let card = await Card.create({
        isMajorArcana: arcana,
        number: req.body.number,
        suit: req.body.suit,
        upKeywords: req.body.upKeywords,
        upDescription: req.body.upDescription,
        revKeywords: req.body.revKeywords,
        revDescription: req.body.revDescription
      })
      console.log('Card created!')
      res.redirect('./edit-collection')
    } catch (err) {
      console.error(err)
    }
  },
  addCardImage: async (req, res) => {
    res.send('image')
  }


};
