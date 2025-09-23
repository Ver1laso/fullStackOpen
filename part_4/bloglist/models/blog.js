require('dotenv').config()

const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

blogSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
})

module.exports = mongoose.model('Blog', blogSchema)