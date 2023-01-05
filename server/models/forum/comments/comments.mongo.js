const mongoose = require('mongoose')

const Schema = mongoose.Schema

const commentSchema = new Schema({
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
    post: {
        type: mongoose.Types.ObjectId,
        required: true
    }
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Commment', commentSchema)