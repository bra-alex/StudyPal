const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
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