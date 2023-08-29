import mongoose from 'mongoose'

const Schema = mongoose.Schema

const groupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    admin: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    messages: {
      type: mongoose.Types.ObjectId,
      ref: 'Group Message',
    },
    members: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    joinCode: Number,
    isPublic: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const groupModel = mongoose.model('Group', groupSchema)

export default groupModel
