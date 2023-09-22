import { Express, Request, Response, NextFunction } from 'express'

import authRoute from './routes/auth.route'
import userRoute from './routes/users.route'
import forumRoute from './routes/forum.route'
import groupRoute from './routes/group.route'
import topicRoute from './routes/topic.route'
import resourceRoute from './routes/resource.route'
import isAuthenticated from './middleware/isAuthenticated'
// import { MongooseError } from 'mongoose'

export default function routes(app: Express) {
  app.use('/auth', authRoute)
  app.use('/forum', isAuthenticated, forumRoute)
  app.use('/groups', isAuthenticated, groupRoute)
  app.use('/resources', isAuthenticated, resourceRoute)
  app.use('/topics', isAuthenticated, topicRoute)
  app.use('/users', isAuthenticated, userRoute)

  app.use((e: Error, _req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
      return next(e)
    }

    e.message.match('E11000')
      ? res.status(409).json({
          code: e.name,
          message: e.message,
        })
      : res.status(500).json(e.message)
  })
}
