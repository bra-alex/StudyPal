const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema({
    user: {
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
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Comment', commentSchema)