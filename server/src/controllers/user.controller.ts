import { NextFunction, Request, Response } from 'express'

import { User } from '../models/dto/dto'
import { socketConnection } from '../sockets'
import { UpdateUserInput } from '../schema/users/users.schema'
import { deleteFile, deleteFolder } from '../util/deleteFromStorage'
import { CreateUserMessageInput } from '../schema/users/messages.schema'
import { createMessage } from '../services/users/messages/messages.service'

import {
  deleteUser,
  updateUser,
  getAllUsers,
  getUserById,
  getUserMessages,
} from '../services/users/users.service'

async function httpGetAllUsers(_req: Request, res: Response, next: NextFunction) {
  try {
    const users = await getAllUsers()

    res.status(200).json(users)
  } catch (e) {
    next(e)
  }
}

async function httpGetUser(_req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json(res.locals.user)
  } catch (e) {
    next(e)
  }
}

async function httpGetUserMessages(_req: Request, res: Response, next: NextFunction) {
  try {
    const messages = await getUserMessages(res.locals.user!.uid)

    res.status(200).json(messages)
  } catch (e) {
    next(e)
  }
}

async function httpCreateMessage(
  req: Request<{}, {}, CreateUserMessageInput['body']>,
  res: Response,
  next: NextFunction,
) {
  const messageNamespace = socketConnection.messagesNamespace().messagesNamespace
  try {
    const sender = res.locals.user as User
    const message = {
      sender: sender._id,
      ...req.body,
      date: new Date(),
    }

    const recipient = await getUserById(message.recipient)

    if (!recipient) return res.status(404).json('Recipient not found')

    const newMessage = await createMessage(message)

    if (sender.messages.length === 0) {
      sender.messages = [newMessage.userMessages?._id]
      await sender.save()
    }

    if (recipient.messages.length === 0) {
      recipient.messages = [newMessage.recipientMessages?._id]
      await recipient.save()
    }

    messageNamespace.to(recipient.uid).emit('message', newMessage.recipientMessages!)

    const messages = newMessage.userMessages.messages.filter(
      message => message.recipient.toString() === recipient._id.toString(),
    )

    return res.status(201).json(messages)
  } catch (e) {
    console.log(e)

    return next(e)
  }
}

async function httpUpdateUser(
  req: Request<UpdateUserInput['params'], {}, UpdateUserInput['body']>,
  res: Response,
  next: NextFunction,
) {
  try {
    const { uid } = res.locals.user!
    const profileImageUrl = req.file?.path ?? res.locals.user!.profileImageUrl

    const userDetails = {
      uid,
      ...req.body,
      profileImageUrl,
    } as User

    const user = await updateUser(userDetails)

    if (req.file) {
      deleteFile(res.locals.user!.profileImageUrl)
    }

    return res.status(200).json(user)
  } catch (e) {
    console.log(e)

    return next(e)
  }
}

async function httpDeleteUser(_req: Request, res: Response, next: NextFunction) {
  try {
    deleteFolder(`uploads/users/${res.locals.user!.uid}`)
    await deleteUser(res.locals.user!.uid)

    res.status(200).json({
      message: 'User Deleted',
    })
  } catch (e) {
    next(e)
  }
}

export {
  httpGetUser,
  httpUpdateUser,
  httpDeleteUser,
  httpGetAllUsers,
  httpCreateMessage,
  httpGetUserMessages,
}
