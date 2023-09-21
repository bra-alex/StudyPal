import { Types } from 'mongoose'
import { User } from '../dto/dto'

interface GeneralServerToClientEvents {
  userConnected: (user: User & { _id: Types.ObjectId }) => void
  userDisconnected: (user: User & { _id: Types.ObjectId }) => void
}

interface MessageServerToClientEvents {
  userConnected: (user: User & { _id: Types.ObjectId }) => void
  userDisconnected: (user: User & { _id: Types.ObjectId }) => void
  typing: (user: string) => void
  typingEnd: (user: string) => void
}

interface MessageClientToServerEvents {
  typing: (data: { recipientUID: string; sender: string }) => void
  typingEnd: (data: { recipientUID: string; sender: string }) => void
}

export { GeneralServerToClientEvents, MessageServerToClientEvents, MessageClientToServerEvents }
