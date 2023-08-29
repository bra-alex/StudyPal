interface User {
  _id: string
  uid: string
  name: string
  username: string
  email: string
  password: string
  profileImageUrl: string
  online: boolean
  posts: string[]
  messages: Messages[]
}

interface Messages {
  _id: string
  sender: User | string
  messages: MessageBody[]
}

interface MessageBody {
  _id: string
  sender: User | string
  message: String
  date: Date
}

interface Posts {
  _id: string
  author: User | string
  postContent: string
  postMedia: { mediaURL: String }[]
  topic: { id: Topics | string; name: string }
  comments: (Comments | string)[]
  createdAt: Date
  updatedAt: Date
}

interface Comments {
  _id: string
  user: User | string
  postContent: string
  postMedia: { mediaURL: String }[]
  createdAt: Date
  updatedAt: Date
}

interface Topics {
  _id: string
  name: string
  members: (User | string)[]
  posts: Posts[]
}

interface Groups {
  _id: string
  name: string
  admin: User | string
  messages: GroupMessages[]
  members: (User | string)[]
  joinCode: number
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
}

interface GroupMessages {
  _id: string
  messages: GroupMessagesData[]
}

interface GroupMessagesData {
  _id?: string
  message: string
  sender: User | string
  date?: Date
  sent?: boolean
}

interface Resources {
  _id: string
  name: string
  fileName: string
  resourceUrl: string
  author: User | string
  createdAt: Date
  updatedAt: Date
}
