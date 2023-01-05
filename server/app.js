const express = require('express')

const app = express()

app.use('/', (req, res) => {
    res.status(200).json({
        message: 'Success'
    })
})

module.exports = app