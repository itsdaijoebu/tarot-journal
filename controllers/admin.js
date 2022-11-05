const User = require("../models/User");
const Card = require("../models/Card");
const Cardface = require("../models/Cardface");
const Cardback = require("../models/Cardback");
const CardCollection = require("../models/CardCollection");
const Spread = require("../models/Spread")
const cloudinary = require("../middleware/cloudinary");

const Reading = require("../models/Reading");

module.exports = {
  editCollection: async (req, res) => {
    try {
      const cards = await Card.find();
      const cardfaces = await Cardface.find().sort({ isMajorArcana: 1, number: 1 });
      const cardCollections = await CardCollection.find().sort({ name: 1 });
      const defaultImage = "https://res.cloudinary.com/itsdaijoebu-api/image/upload/v1667105416/00227-2311773528-masterpiece_best_quality_the_fool_tarot_card_by_victo_ngai_m6fy0j.png"
      res.render("edit-collection.ejs", { user: req.user, cards: cards, cardfaces: cardfaces, cardCollections: cardCollections, defaultImage: defaultImage });
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
        revDescription: req.body.revDescription,
        isReversed: false
      })
      console.log('Card created!')
      res.redirect('./edit-collection')
    } catch (err) {
      console.error(err)
    }
  },
  addCardface: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path)
      const cardData = req.body.card.split('_')
      const suit = cardData.pop()
      const number = cardData.pop()
      const cardId = cardData.pop()
      const cardCollectionData = req.body.cardCollection.split('_')
      const cardCollectionName = cardCollectionData.pop()
      const cardCollectionId = cardCollectionData.pop()
      const arcana = req.body.cardfaceIsMajorArcana === 'on' ? true : false;
      console.log("admin => addCardFace:", req.body)
      let cardface = await Cardface.create({
        cardCollection: cardCollectionName,
        cardCollectionId: cardCollectionId,
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
    } catch (err) {
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
  },
  addSpread: async (req, res) => {
    try {
      let positions = [];
      let numberCards = req.body.numberCards
      for(let i = 1; i <= numberCards; i++) {
        const position =  {
          order: req.body['positionOrder' + i],
          name: req.body['positionName' + i],
          meaning: req.body['positionMeaning' + i]
        }
        positions.push(position)
      }
      console.log(req.body)
      let spread = await Spread.create({
        name: req.body.spreadName,
        numberCards: numberCards,
        positions: positions
      })
      console.log('Added Spread!')
      res.redirect('./edit-collection')
    } catch (err) {
      console.error(err);
    }
  },
  addField: async (req, res) => {
    try {
      console.log('adding')
      await Reading.updateMany({}, {isReversed: false})
      res.redirect('./edit-collection')
    } catch (err) {
      console.error(err)
    }
  }
};
