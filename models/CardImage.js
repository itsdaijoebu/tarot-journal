const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const CardImageSchema = new mongoose.Schema({
  cardCollection: { type: String, required: true },
  card: { type: ObjectId, ref: "Card", required: true },
  image: { type: String, required: true },
  cloudinaryId: { type: String, required: true }
});

module.exports = mongoose.model("CardImage", CardImageSchema);