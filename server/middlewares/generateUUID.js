const uuid = require('uuid').v4

function generateUUID(req, res, next) {
    req.uid = uuid()
    next()
}

module.exports = generateUUID