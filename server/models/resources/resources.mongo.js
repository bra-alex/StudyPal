const mongoose = require('mongoose')

const Schema = mongoose.Schema

const resourceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    resourceUrl: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Resource', resourceSchema)