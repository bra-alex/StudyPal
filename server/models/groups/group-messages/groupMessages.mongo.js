const mongoose = require('mongoose')

const Schema = mongoose.Schema

const groupMessagesSchema = new Schema({
    messages: [
        {
            message: {
                type: String,
                required: true
            },
            sender: {
                type: mongoose.Types.ObjectId,
                ref: 'User',
                required: true
            },
            date: {
                type: Date,
                default: Date.now()
            }

        }
    ]
})

module.exports = mongoose.model('Group Message', groupMessagesSchema)