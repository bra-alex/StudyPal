import mongoose from 'mongoose'
import { Messages } from '../../dto/dto'

const Schema = mongoose.Schema

const messagesSchema = new Schema({
  sender: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  messages: [
    {
      recipient: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      messages: [
        {
          sender: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
          },
          message: {
            type: String,
            required: true,
          },
          date: {
            type: Date,
            default: Date.now(),
          },
        },
      ],
    },
  ],
})

const messagesModel = mongoose.model<Messages>('Message', messagesSchema)

export default messagesModel
