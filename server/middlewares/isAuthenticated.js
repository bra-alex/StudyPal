const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const authHeader = req.get('Authorization')

        if (!authHeader) {
            const e = new Error('Not authenticated')
            e.status = 401
            throw e
        }

        const token = authHeader.split(' ')[1]

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        if (!decodedToken) {
            const e = new Error('Not authenticated')
            e.status = 401
            throw e
        }

        req.userId = decodedToken.userId

        next()
    } catch (e) {
        if (!e.status) {
            e.status = 500
        }
        next(e)
    }
}