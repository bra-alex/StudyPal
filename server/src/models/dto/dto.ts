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
  posts: (Posts | string)[]
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
  postMedia?: { mediaURL: string }[]
  topic: { id: Topics | string; name: string }
  comments: (Comments | string)[]
  createdAt?: Date
  updatedAt?: Date
}

interface Comments extends mongoose.Document {
  user: User | string
  postContent: string
  postMedia: { mediaURL: string }[]
  createdAt: Date
  updatedAt: Date
}

interface Topics extends mongoose.Document {
  name: string
  creator: string
  members: (User | string)[]
  posts: (Posts | string)[]
}

interface Groups extends mongoose.Document {
  name: string
  admin: User | string
  messages?: string
  members: (User | string)[]
  joinCode?: number
  isPublic: boolean
  createdAt?: Date
  updatedAt?: Date
}

interface GroupMessages extends mongoose.Document {
  _id?: string
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
  category: string
  fileName: string
  resourceUrl: string
  author: User | string
  createdAt: Date
  updatedAt: Date
}

type AuthType = Auth
type UserType = User
type MessagesType = Messages
type PostsType = Posts
type CommentsType = Comments
type TopicsType = Topics
type GroupsType = Groups
type GroupMessagesType = GroupMessages
type ResourcesType = Resources

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
  AuthType,
  UserType,
  PostsType,
  TopicsType,
  GroupsType,
  MessagesType,
  CommentsType,
  ResourcesType,
  GroupMessagesType,
}
