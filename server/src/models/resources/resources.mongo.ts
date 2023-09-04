import mongoose from 'mongoose'
import { Resources } from '../dto/dto'

const Schema = mongoose.Schema

const resourceSchema = new Schema(
  {
    category: {
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
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const resourceModel = mongoose.model<Resources>('Resource', resourceSchema)

export default resourceModel
