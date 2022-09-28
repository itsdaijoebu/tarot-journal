const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const CardSchema = new mongoose.Schema({
  card: { type: ObjectId, ref: "Card", required: true },
  image: { type: String, required: true },
  cloudinaryId: { type: String, required: true },
});

module.exports = mongoose.model("Card", CardSchema);