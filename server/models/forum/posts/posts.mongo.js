const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    postContent: {
        type: String,
        required: true
    },
    topic: {
        type: mongoose.Types.ObjectId,
        ref: 'Topic'
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