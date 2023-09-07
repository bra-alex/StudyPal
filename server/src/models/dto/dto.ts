import mongoose from 'mongoose'

interface Auth extends mongoose.Document {
  uid: string
  email: string
  username: string
  password: string
}

interface User extends mongoose.Document {
  uid: string
  name: string
  username: string
  email: string
  profileImageUrl: string
  online: boolean
  posts: string[]
  messages: Messages[]
}

interface Messages extends mongoose.Document {
  sender: User | string
  messages: MessagePacket[]
}

interface MessageInput {
  sender: string
  recipient: string
  message: string
  date: Date
}

interface MessagePacket {
  recipient: string
  messages: MessageBody[]
}

interface MessageBody {
  _id?: string
  sender: User | string
  message: String
  date: Date
}

interface Posts extends mongoose.Document {
  author: User | string
  postContent: string
  postMedia: { mediaURL: String }[]
  topic: { id: Topics | string; name: string }
  comments: (Comments | string)[]
  createdAt: Date
  updatedAt: Date
}

interface Comments extends mongoose.Document {
  user: User | string
  postContent: string
  postMedia: { mediaURL: String }[]
  createdAt: Date
  updatedAt: Date
}

interface Topics extends mongoose.Document {
  name: string
  members: (User | string)[]
  posts: Posts[]
}

interface Groups extends mongoose.Document {
  name: string
  admin: User | string
  messages: GroupMessages[]
  members: (User | string)[]
  joinCode: number
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
}

interface GroupMessages extends mongoose.Document {
  messages: GroupMessagesData[]
}

interface GroupMessagesData {
  _id?: string
  message: string
  sender: User | string
  date?: Date
  sent?: boolean
}

interface Resources extends mongoose.Document {
  name: string
  fileName: string
  resourceUrl: string
  author: User | string
  createdAt: Date
  updatedAt: Date
}

export {
  Auth,
  User,
  Posts,
  Topics,
  Groups,
  Comments,
  Messages,
  Resources,
  MessageInput,
  GroupMessages,
  GroupMessagesData,
}
