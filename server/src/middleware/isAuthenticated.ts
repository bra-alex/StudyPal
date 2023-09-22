import { NextFunction, Request, Response } from 'express'

import { validateJWT } from '../util/jwt'
import { JwtPayload } from 'jsonwebtoken'

export default function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.get('Authorization')

    if (!authHeader) return res.status(403).json('Not authenticated')

    const token = authHeader.split(' ')[1]

    const { expired, decoded, valid } = validateJWT(token)

    if (expired && !valid) return res.status(403).json('Not authenticated')

    res.locals.user = decoded as JwtPayload

    return next()
  } catch (e) {
    next(e)
  }
}
