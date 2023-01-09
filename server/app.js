const express = require('express')

const userRoute = require('./routes/user.route')
const forumRoute = require('./routes/forum.route')
const topicRoute = require('./routes/topic.route')
const resourceRoute = require('./routes/resource.route')

const app = express()

app.use(express.json())

app.use('/', userRoute)
app.use('/forum', forumRoute)
app.use('/topic', topicRoute)
app.use('/resource', resourceRoute)

app.use((error, req, res, next) => {
    res.status(error.status).json({
        message: error.message
    })
})

module.exports = app