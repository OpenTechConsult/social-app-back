const mongoose = require('mongoose')

const postModelSchema = mongoose.Schema({
    user: String,
    imgName: String,
    text: String,
    avatar: String,
    timestamp: String
})

module.exports = mongoose.model('PostModel', postModelSchema)