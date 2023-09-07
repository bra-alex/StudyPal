import mongoose from 'mongoose'
import { Auth } from '../dto/dto'

const Schema = mongoose.Schema

const authSchema = new Schema({
  uid: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

const authModel = mongoose.model<Auth>('Auth', authSchema)

export default authModel
