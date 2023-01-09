const mongoose = require('mongoose')

mongoose.set('strictQuery', true)

mongoose.connection.once('open', () => console.log('Connected'))

mongoose.connection.on('error', (err) => console.error(err))

async function mongoConnect() {
    return await mongoose.connect(process.env.MONGO_URL)
}

module.exports = {
    mongoConnect
}
