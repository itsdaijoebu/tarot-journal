const mongoose = require('mongoose')

const CardSchema = new mongoose.Schema({
    image: {type: String, required: true },
    cloudinaryId: { type: String, required: true },
    isMajorArcana: { type: Boolean, required: true },
    number: { type: Number, required: true },
    suit: { type: String, required: true },
    upright: { type: String, required: true },
    uprightDescription: { type: String, required: true },
    reversed: { type: String, required: true },
    reversedDescription: { type: String, required: true }
})

module.exports = mongoose.model("Card", CardSchema);
