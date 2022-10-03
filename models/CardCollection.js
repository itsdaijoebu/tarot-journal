const mongoose = require('mongoose')

const CardCollectionSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true}
})

module.exports = mongoose.model("CardCollection", CardCollectionSchema);