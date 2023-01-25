const path = require('path')
const express = require('express')

const userRoute = require('./routes/user.route')
const authRoute = require('./routes/auth.route')
const groupRoute = require('./routes/group.route')
const forumRoute = require('./routes/forum.route')
const topicRoute = require('./routes/topic.route')
const resourceRoute = require('./routes/resource.route')

const app = express()

app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use('/', userRoute)
app.use('/', groupRoute)
app.use('/', topicRoute)
app.use('/', resourceRoute)
app.use('/auth', authRoute)
app.use('/forum', forumRoute)

app.use((error, req, res, next) => {
    if (!error.status) {
        error.status = 500
    }

    res.status(error.status).json({
        message: error.message
    })
})

module.exports = app