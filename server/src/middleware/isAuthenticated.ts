import jwt from 'jsonwebtoken'
import config from 'config'
import { NextFunction, Request, Response } from 'express'

const JWT_SECRET = config.get<string>('jwt_secret')

export default function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.get('Authorization')

    if (!authHeader) return res.status(403).json('Not authenticated')

    const token = authHeader.split(' ')[1]

    const decodedToken = jwt.verify(token, JWT_SECRET)

    if (!decodedToken) return res.status(403).json('Not authenticated')

    // req.userId = decodedToken.userId

    return next()
  } catch (e) {
    next(e)
  }
}
