const express = require('express')

const forumRoute = require('./routes/forum.route')

const app = express()

app.use(express.json())

app.use('/', forumRoute)

app.use((error, req, res, next) => {
    res.status(error.status).json({
        message: error.message
    })
})

module.exports = app