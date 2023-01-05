const mongoose = require('mongoose')

const Schema = mongoose.Schema

const topicSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    users: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    posts: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Post'
        }
    ]
})

module.exports = mongoose.model('Topic', topicSchema)