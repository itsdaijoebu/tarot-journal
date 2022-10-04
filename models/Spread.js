const mongoose = require("mongoose");

// spread is type of spread (past/present/future, celtic cross, etc),
// reading is a map that has each card keyed to card 'slot', ex. past: <objectid for The Fool>)
// interpretation is user-submitted interpretation, with interpretations keyed to each 'slot', ex. past: something will happen on a dark and stormy night
const PositionSchema = new mongoose.Schema({
  order: {type: Number, required: true},
  name: { type: String, required: true },
  meaning: { type: String, required: true }
})

const SpreadSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true},
  numberCards: { type: Number },
  positions: [PositionSchema]
});

module.exports = mongoose.model("Spread", SpreadSchema);
