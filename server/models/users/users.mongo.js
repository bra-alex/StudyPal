const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    uid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String,
        required: true
    },
    posts: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Post'
        }
    ],
    messages: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Message'
        }
    ]
})

module.exports = mongoose.model('User', userSchema)