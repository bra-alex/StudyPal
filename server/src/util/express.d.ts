import { JwtPayload } from 'jsonwebtoken'
import {
  AuthType,
  CommentsType,
  GroupMessagesType,
  GroupsType,
  MessagesType,
  PostsType,
  ResourcesType,
  TopicsType,
  UserType,
} from '../models/dto/dto'

export interface Locals {
  auth?: AuthType
  user?: UserType | JwtPayload
  message?: MessagesType
  post?: PostsType
  comment?: CommentsType
  topic?: TopicsType
  group?: GroupsType
  groupMessage?: GroupMessagesType
  resource?: ResourcesType
}

export as namespace Express
export = Express

declare namespace Express {
  export interface Response {
    locals: Locals
  }
}
