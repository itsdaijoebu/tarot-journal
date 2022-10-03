const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const CardfaceSchema = new mongoose.Schema({
  cardCollection: { type: String, required: true },
  cardCollectionId: { type: ObjectId, ref: "CardCollection", required: true},
  cardId: { type: ObjectId, ref: "Card", required: true },
  isMajorArcana: { type: Boolean, required: true},
  number: { type: String, required: true},
  suit: { type: String, required: true},
  image: { type: String, required: true },
  cloudinaryId: { type: String, required: true }
});

module.exports = mongoose.model("Cardface", CardfaceSchema);