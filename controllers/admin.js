const User = require("../models/User");
const Card = require("../models/Card");
const Cardface = require("../models/Cardface");
const Cardback = require("../models/Cardback");
const CardCollection = require("../models/CardCollection");
const cloudinary = require("../middleware/cloudinary");

module.exports = {
  editCollection: async (req, res) => {
    try {
      const cards = await Card.find();
      const cardfaces = await Cardface.find().sort({isMajorArcana: 1, number: 1});
      const cardCollections = await CardCollection.find().sort({name: 1});
      res.render("edit-collection.ejs", { user: req.user, cards: cards, cardfaces: cardfaces, cardCollections: cardCollections });
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
  addCardface: async (req, res) => {
    try{
      const result = await cloudinary.uploader.upload(req.file.path)
      let cardData = req.body.card.split('-')
      let cardId = cardData.shift()
      let number = cardData.shift()
      let suit = cardData.shift()
      let arcana = req.body.isMajorArcana ? true : false;
      let cardface = await Cardface.create({
        cardCollection: req.body.cardCollection.text,
        cardCollectionId: req.body.cardCollection,
        cardId: cardId,
        isMajorArcana: arcana,
        number: number,
        suit: suit,
        image: result.secure_url,
        cloudinaryId: result.public_id
      })
      console.log('Image added!')
      res.redirect('./edit-collection')
    } catch (err) {
      console.error(err)
    }
  },
  addCardback: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path)
      let cardback = await Cardback.create({
        name: req.body.cardbackName,
        image: result.secure_url,
        cloudinaryId: result.public_id
      })
      console.log('Cardback added')
      res.redirect('./edit-collection')
    } catch(err) {
      console.error(err)
    }
  },
  addCardCollection: async (req, res) => {
    try {
      let cardCollection = await CardCollection.create({
        name: req.body.newCardCollection
      })
      console.log('Card Collection added')
      res.redirect('./edit-collection')
    } catch (err) {
      console.error(err)
    }
  }
};
