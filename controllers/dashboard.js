const Reading = require("../models/Reading");
const User = require("../models/User");
const Card = require("../models/Card");
const Cardface = require("../models/Cardface");
// const Cardback = require("../models/Cardback");
const CardCollection = require("../models/CardCollection");
const Spread = require("../models/Spread")

const moment = require('moment')

module.exports = {
  getDash: async (req, res) => {
    try {
      res.render("dashboard.ejs");
    } catch (err) {
      console.log(err);
    }
  },
  getReadings: async (req, res) => {
    try {
      const cards = await Card.find();
      const cardfaces = await Cardface.find().sort({ isMajorArcana: 1, number: 1 });
      const cardCollections = await CardCollection.find().sort({ name: 1 });
      const readings = await Reading.find({
        userId: req.user._id
      }).sort({ created: -1 })
      res.render("readings.ejs", { user: req.user, readings: readings, cards: cards, cardfaces: cardfaces, cardCollections: cardCollections, moment: moment })
    } catch (err) {
      console.error(err)
    }
  },
  postReading: async (req, res) => {
    try {
      if (req.user) {
        const pastInfo = req.body.pastInterpretationCardId.split('-')
        const presentInfo = req.body.presentInterpretationCardId.split('-')
        const futureInfo = req.body.futureInterpretationCardId.split('-')
        let reading = await Reading.create({
          userId: req.user._id,
          spread: 'Past/Present/Future',
          reading: {
            past: pastInfo[0],
            pastReversed: pastInfo[1],
            present: presentInfo[0],
            presentReversed: presentInfo[1],
            future: futureInfo[0],
            futureReversed: futureInfo[1]
          },
          question: req.body.question,
          interpretation: {
            past: req.body.interpretationPast,
            present: req.body.interpretationPresent,
            future: req.body.interpretationFuture
          }
        })
        res.redirect('readings')
      } else {
        res.redirect('/signup')
      }
    } catch (err) {
      console.error(err)
    }
  }
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
