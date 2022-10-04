const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

// spread is type of spread (past/present/future, celtic cross, etc),
// reading is a map that has each card keyed to card 'slot', ex. past: <objectid for The Fool>)
// interpretation is user-submitted interpretation, with interpretations keyed to each 'slot', ex. past: something will happen on a dark and stormy night
const ReadingSchema = new mongoose.Schema({
  userId: { type: ObjectId, ref: "User", required: true },
  spread: { type: String, required: true },
  reading: { type: Map, of: String, required: true },
  question: { type:     String },
  interpretation: { type: Map, of: String },
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Reading", ReadingSchema);
