import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import express from 'express'

import routes from './routes'

const app = express()

app.use(helmet())
app.use(express.json())
app.use(morgan('dev'))
app.use(
  cors({
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  }),
)
app.use('/uploads', express.static('uploads'))

routes(app)

export default app
