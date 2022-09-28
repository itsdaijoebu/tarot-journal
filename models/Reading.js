const mongoose = require('mongoose')
const {ObjectId} = require('mongodb')

const ReadingSchema = new mongoose.Schema({
    userId: { type: ObjectId, ref: "User", required: true},
    spread: { type: String, required: true},
    cards: [{ type: String, required: true}],
    question: {type: String, required: true},
    entry: {type: String }
})

module.exports = mongoose.model("Reading", ReadingSchema);