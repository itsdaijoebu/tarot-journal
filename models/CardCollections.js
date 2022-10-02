const mongoose = require('mongoose')

const CardCollectionsSchema = new mongoose.Schema({
    cardCollection: {type: String, required: true}
})

module.exports = mongoose.model("CardCollection", CardCollectionSchema);

