const express = require('express')

const forumRoute = express.Router()

forumRoute.get('', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the forum'
    })
})

module.exports = forumRoute