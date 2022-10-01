const mongoose = require('mongoose')

const CardSchema = new mongoose.Schema({
    // image: {type: String, required: true },
    // cloudinaryId: { type: String, required: true },
    isMajorArcana: { type: Boolean, required: true },
    number: { type: Number, required: true },
    suit: { type: String, required: true },
    upKeywords: { type: String, required: true },
    upDescription: { type: String, required: true },
    revKeywords: { type: String, required: true },
    revDescription: { type: String, required: true }
})

module.exports = mongoose.model("Card", CardSchema);
