interface User {
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
  sender: User | string
  messages: MessageBody[]
}

interface MessageBody {
  sender: User | string
  message: String
  date: Date
}

interface Posts {
  author: User | string
  postContent: string
  postMedia: { mediaURL: String }[]
  topic: { id: Topics | string; name: string }
  comments: (Comments | string)[]
  createdAt: Date
  updatedAt: Date
}

interface Comments {
  user: User | string
  postContent: string
  postMedia: { mediaURL: String }[]
  createdAt: Date
  updatedAt: Date
}

interface Topics {
  name: string
  members: (User | string)[]
  posts: Posts[]
}

interface Groups {
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
  messages: {
    message: string
    sender: User | string
    date: Date
    sent: boolean
  }[]
}

interface Resources {
  name: string
  fileName: string
  resourceUrl: string
  author: User | string
  createdAt: Date
  updatedAt: Date
}
