import mongoose from 'mongoose'
import { Comments } from '../../dto/dto'

const Schema = mongoose.Schema

const commentSchema = new Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    postContent: {
      type: String,
      required: true,
    },
    postMedia: [
      {
        mediaURL: String,
      },
    ],
  },
  {
    timestamps: true,
  },
)

const commentModel = mongoose.model<Comments>('Comment', commentSchema)

export default commentModel
