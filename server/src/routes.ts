import { Express } from 'express'

import authRoute from './routes/auth.route'
import userRoute from './routes/users.route'
import forumRoute from './routes/forum.route'
import groupRoute from './routes/group.route'
import topicRoute from './routes/topic.route'
import resourceRoute from './routes/resource.route'
import isAuthenticated from './middleware/isAuthenticated'

export default function routes(app: Express) {
  app.use('/auth', authRoute)
  app.use('/forum', isAuthenticated, forumRoute)
  app.use('/groups', isAuthenticated, groupRoute)
  app.use('/resources', isAuthenticated, resourceRoute)
  app.use('/topics', isAuthenticated, topicRoute)
  app.use('/users', isAuthenticated, userRoute)
}
