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
  sender: User
  messages: MessageBody[]
}

interface MessageBody {
  sender: User
  message: String
  date: Date
}

interface Posts {
  author: User
  postContent: string
  postMedia: { mediaURL: String }[]
  topic: { id: Topics; name: string }
  comments: Comments[]
  createdAt: Date
  updatedAt: Date
}

interface Comments {
  user: User
  postContent: string
  postMedia: { mediaURL: String }[]
  createdAt: Date
  updatedAt: Date
}

interface Topics {
  name: string
  members: User[]
  posts: Posts[]
}

interface Groups {
  name: string
  admin: User
  messages: GroupMessages[]
  members: User[]
  joinCode: number
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
}

interface GroupMessages {
  messages: {
    message: string
    sender: User
    date: Date
    sent: boolean
  }[]
}

interface Resources {
  name: string
  fileName: string
  resourceUrl: string
  author: User
  createdAt: Date
  updatedAt: Date
}
