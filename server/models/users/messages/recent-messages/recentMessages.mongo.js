const mongoose = require('mongoose')

const Schema = mongoose.Schema

const recentMessagesSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    messages: [
        {
            user: {
                type: mongoose.Types.ObjectId,
                ref: 'User',
                required: true
            },
            message: {
                type: String,
                required: true
            }
        }
    ]
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Recent Message', recentMessagesSchema)