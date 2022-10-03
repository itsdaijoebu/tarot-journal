const User = require("../models/User");
const Card = require("../models/Card");
const Cardface = require("../models/Cardface");
const Cardback = require("../models/Cardback");
const CardCollection = require("../models/CardCollection")
const cloudinary = require("../middleware/cloudinary");

module.exports = {
    getCards: async (req, res) => {
        try {
            const results = await Card.find();
            console.log(results)
            res.json({cards: results.map(result => result.toObject())})
        } catch (err) {
            console.error(err)
        }
    },
    getCardbacks: async (req, res) => {
        try {
            const results = await Cardback.find().sort({name: 1});
            res.json({cards: results.map(result => result.toObject())})
        } catch (err) {
            console.error(err)
        }
    },
    getCardfaces: async (req, res) => {
        try {
            const results = await Cardface.find().sort({cardCollection: 1, isMajorArcana: 1, suit: 1, number: 1});
            res.json({cards: results.map(result => result.toObject())})
        } catch (err) {
            console.error(err)
        }
    },
    getCardCollections: async (req, res) => {
        try {
            const results = await CardCollection.find().sort({name: 1})
            res.json({cards: results.map(result => result.toObject())})
        } catch (err) {
            console.error(err)
        }
    }
}