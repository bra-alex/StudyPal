import mongoose from 'mongoose'
import { GroupMessages } from '../../dto/dto'

const Schema = mongoose.Schema

const groupMessagesSchema = new Schema({
  messages: [
    {
      message: {
        type: String,
        required: true,
      },
      sender: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
      sent: {
        type: Boolean,
        default: true,
      },
    },
  ],
})

const groupMessagesModel = mongoose.model<GroupMessages>('Group Message', groupMessagesSchema)

export default groupMessagesModel
