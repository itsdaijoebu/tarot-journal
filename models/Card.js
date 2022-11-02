const mongoose = require('mongoose')

const CardSchema = new mongoose.Schema({
    isMajorArcana: { type: Boolean, required: true },
    number: { type: Number, required: true },
    suit: { type: String, required: true },
    upKeywords: { type: String, required: true },
    upDescription: { type: String, required: true },
    revKeywords: { type: String, required: true },
    revDescription: { type: String, required: true },
    isReversed: {type: Boolean}
})

module.exports = mongoose.model("Card", CardSchema);
