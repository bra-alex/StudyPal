const uuid = require('uuid').v4

function generateUUID(req, res, next) {
    req.body.uid = uuid()
    next()
}

module.exports = generateUUID