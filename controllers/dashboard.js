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
      const readings = await Reading.find({
        user: new RegExp(`^${req.user.username}$`, "i"),
      });
      res.render("dashboard.ejs", { readings: readings, user: req.user });
      console.log("dashboard controller - readings:", readings);
    } catch (err) {
      console.log(err);
    }
  },
  getReadings: async (req, res) => {
    console.log(req.user._id)
    try {
      const cards = await Card.find();
      const cardfaces = await Cardface.find().sort({ isMajorArcana: 1, number: 1 });
      const cardCollections = await CardCollection.find().sort({ name: 1 });
      const readings = await Reading.find({
        userId: req.user._id
      })
      console.log('readings: ', readings)
      res.render("readings.ejs", {user: req.user, readings: readings, cards: cards, cardfaces: cardfaces, cardCollections: cardCollections, moment: moment })
    } catch (err) {
      console.error(err)
    }
  },
  postReading: async (req, res) => {
    try {
      console.log('user: ', req.user)
      console.log('req body', req.body)
      let reading = await Reading.create({
        userId: req.user._id,
        spread: 'Past/Present/Future',
        reading: {
          past: req.body.pastInterpretationCardId,
          present: req.body.presentInterpretationCardId,
          future: req.body.futureInterpretationCardId
        },
        question: req.body.question,
        interpretation: {
          past: req.body.interpretationPast,
          present: req.body.interpretationPresent,
          future: req.body.interpretationFuture
        }
      })
      res.redirect('/dashboard')
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
