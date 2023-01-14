const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    postContent: {
        type: String,
        required: true
    },
    postMedia: [
        {
            mediaURL: String
        }
    ],
    topic: {
        id: {
            type: mongoose.Types.ObjectId,
            ref: 'Topic',
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    comments: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Comment'
        }
    ],
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Post', postSchema)