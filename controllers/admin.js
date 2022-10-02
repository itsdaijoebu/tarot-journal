const User = require("../models/User");
const Card = require("../models/Card");
const CardImage = require("../models/CardImage");
const cloudinary = require("../middleware/cloudinary");

module.exports = {
  editCollection: async (req, res) => {
    try {
      const cards = await Card.find();
      const cardImages = await CardImage.find();
      res.render("edit-collection.ejs", { user: req.user, cards: cards, cardImages: cardImages });
    } catch (err) {
      console.log(err);
    }
  },
  addCard: async (req, res) => {
    try {
      let arcana = req.body.isMajorArcana ? true : false
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
    try{
      const result = await cloudinary.uploader.upload(req.file.path)
      let cardData = req.body.card.split('-')
      let cardId = cardData.shift()
      let cardName = cardData.join(' ')
      let cardImage = await CardImage.create({
        cardCollection: req.body.cardCollection,
        cardId: cardId,
        cardName: cardName,
        image: result.secure_url,
        cloudinaryId: result.public_id
      })
      console.log('Image added!')
      res.redirect('./edit-collection')
    } catch (err) {
      console.error(err)
    }
  }
};
