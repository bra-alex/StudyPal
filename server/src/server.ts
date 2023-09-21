import dotenv from 'dotenv'
dotenv.config()
import http from 'http'
import config from 'config'

import app from './app'
import { mongoConnect } from './util/db'
import { initSocketServer } from './sockets'

const PORT = config.get<number>('port')

const server = http.createServer(app)

server.listen(PORT, async () => {
  console.log(`Connected on port: ${PORT}`)
  await mongoConnect()

  initSocketServer(server)
})
