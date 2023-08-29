import dotenv from 'dotenv'
dotenv.config()
import http from 'http'
import config from 'config'

import app from './app'

const PORT = config.get<number>('port')

const server = http.createServer(app)

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`))
