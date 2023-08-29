import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
  uid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImageUrl: {
    type: String,
    required: true,
  },
  online: {
    type: Boolean,
    required: true,
    default: true,
  },
  posts: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Post',
    },
  ],
  messages: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Message',
    },
  ],
})

const userModel = mongoose.model<User>('User', userSchema)

export default userModel
