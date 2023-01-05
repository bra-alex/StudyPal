require('dotenv').config()
const http = require('http')

const app = require('./app')
const db = require('./util/db')

const server = http.createServer(app)

async function startServer(){
    await db.mongoConnect()
    server.listen(process.env.PORT, () => console.log('Server running on port ' + process.env.PORT))
}

startServer()