import config from 'config'
import mongoose from 'mongoose'

const MONGO_URL = config.get<string>('mongo_url')

mongoose.set('strictQuery', true)

mongoose.connection.once('open', () => console.log('Connected to mongo'))

mongoose.connection.on('error', (err: unknown) => console.error(err))

async function mongoConnect() {
  return await mongoose.connect(MONGO_URL)
}

export { mongoConnect }
