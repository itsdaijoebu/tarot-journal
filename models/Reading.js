const mongoose = require('mongoose')

const ReadingSchema = new mongoose.Schema({
    spread: { type: String, required: true},
    cards: [{ type: String, required: true}],
    question: {type: String, required: true},
    entry: String
})

module.exports = mongoose.model("Reading", ReadingSchema);