import { Types } from 'mongoose'
import { Comments, GroupMessages, Groups, MessagesType, Topics, User } from '../dto/dto'

interface PostData {
  _id: string
  author: {
    name: string
    username: string
  }
  postContent: string
  postMedia: { mediaURL: string }[] | undefined
  topic: {
    id: string | Topics
    name: string
  }
  comments: (string | Comments)[]
  createdAt: Date | undefined
  updatedAt: Date | undefined
  __v: number
}

interface GeneralServerToClientEvents {
  userConnected: (user: User & { _id: Types.ObjectId }) => void
  userDisconnected: (user: User & { _id: Types.ObjectId }) => void
  post: (data: { action: string; post: PostData | string }) => void
  comment: (data: {
    action: string
    comment: string | (Comments & { _id: Types.ObjectId })
  }) => void
}

interface MessageServerToClientEvents {
  userConnected: (user: User & { _id: Types.ObjectId }) => void
  userDisconnected: (user: User & { _id: Types.ObjectId }) => void
  message: (message: MessagesType) => void
  typing: (user: string) => void
  typingEnd: (user: string) => void
}

interface MessageClientToServerEvents {
  typing: (data: { recipientUID: string; sender: string }) => void
  typingEnd: (data: { recipientUID: string; sender: string }) => void
}

interface GroupServerToClientEvents {
  userConnected: (user: User & { _id: Types.ObjectId }) => void
  userDisconnected: (user: User & { _id: Types.ObjectId }) => void
  message: (message: GroupMessages & { _id: string }) => void
  group: (data: { action: string; group: string | (Groups & { _id: Types.ObjectId }) }) => void
}

export {
  GeneralServerToClientEvents,
  MessageServerToClientEvents,
  MessageClientToServerEvents,
  GroupServerToClientEvents,
}
