const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const CardImageSchema = new mongoose.Schema({
  cardCollection: { type: String, required: true },
  cardId: { type: ObjectId, ref: "Card", required: true },
  cardName: { type: String, required: true},
  image: { type: String, required: true },
  cloudinaryId: { type: String, required: true }
});

module.exports = mongoose.model("CardImage", CardImageSchema);