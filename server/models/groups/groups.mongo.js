const mongoose = require('mongoose')

const Schema = mongoose.Schema

const groupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    admin: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    messages: {
        type: mongoose.Types.ObjectId,
        ref: 'Group Message',
    },
    members: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        }
    ],
    joinCode: Number,
    isPublic: {
        type: Boolean,
        required: true
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Group', groupSchema)