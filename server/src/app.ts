import cors from 'cors'
import path from 'path'
import helmet from 'helmet'
import morgan from 'morgan'
import express from 'express'

const app = express()

app.use(express.json())
app.use(morgan('combined'))
app.use(helmet())
app.use(
  cors({
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  }),
)
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

export default app
