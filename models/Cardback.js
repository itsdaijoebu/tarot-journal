const mongoose = require("mongoose");

const CardBackSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true},
  image: { type: String, required: true },
  cloudinaryId: { type: String, required: true }
});

module.exports = mongoose.model("CardBack", CardBackSchema);