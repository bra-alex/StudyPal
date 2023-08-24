import http from 'http'
import dotenv from 'dotenv'
dotenv.config()

import config from 'config'

const PORT = config.get<number>('port')

const server = http.createServer()

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`))
