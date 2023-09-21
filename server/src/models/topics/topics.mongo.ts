import mongoose from 'mongoose'
import { Topics } from '../dto/dto'

const Schema = mongoose.Schema

const topicSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  members: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  ],
  posts: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Post',
    },
  ],
})

const topicsModel = mongoose.model<Topics>('Topic', topicSchema)

export default topicsModel