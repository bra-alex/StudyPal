import mongoose from 'mongoose'

const Schema = mongoose.Schema

const topicSchema = new Schema({
  name: {
    type: String,
    required: true,
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

const topicsModel = mongoose.model('Topic', topicSchema)

export default topicsModel
