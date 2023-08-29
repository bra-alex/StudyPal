import mongoose from 'mongoose'

const Schema = mongoose.Schema

const resourceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    resourceUrl: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
)

const resourceModel = mongoose.model<Resources>('Resource', resourceSchema)

export default resourceModel
