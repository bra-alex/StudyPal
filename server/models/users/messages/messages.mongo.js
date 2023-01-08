const mongoose = require('mongoose')

const Schema = mongoose.Schema

const messagesSchema = new Schema({
    sender: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    messages: [
        {
            recipient: {
                type: mongoose.Types.ObjectId,
                ref: 'User',
                required: true
            },
            messages: [
                {
                    message: {
                        type: String,
                        required: true
                    },
                    date: {
                        type: Date,
                        default: Date.now()
                    }
                }
            ]
        }
    ]
})

module.exports = mongoose.model('Message', messagesSchema)