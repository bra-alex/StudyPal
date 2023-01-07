const mongoose = require('mongoose')

const Schema = mongoose.Schema

const messagesSchema = new Schema({
    messages: [
        {
            user: {
                type: mongoose.Types.ObjectId,
                ref: 'User',
                required: true
            },
            message: [
                {
                    type: String,
                    required: true
                }
            ]
        }
    ]
})

module.exports = mongoose.model('Message', messagesSchema)