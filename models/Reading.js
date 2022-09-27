const mongoose = require('mongoose')

const ReadingSchema = new mongoose.Schema({
    user: { type: String, required: true},
    spread: { type: String, required: true},
    cards: [{ type: String, required: true}],
    question: {type: String, required: true},
    entry: {type: String }
})

module.exports = mongoose.model("Reading", ReadingSchema);