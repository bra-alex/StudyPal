import { NextFunction, Request, Response } from 'express'

import { User } from '../models/dto/dto'
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
  req: Request<CreateUserMessageInput['body']>,
  res: Response,
  next: NextFunction,
) {
  //   const messageNamespace = messagesNamespace().messagesNamespace
  try {
    const message = {
      sender: req.body.sender,
      recipient: req.body.recipient,
      message: req.body.message,
      date: new Date(),
    }
    const sender = await getUserById(message.sender)
    const recipient = await getUserById(message.recipient)

    if (sender === null || recipient === null) return res.status(404).json('User not found')

    const newMessage = await createMessage(message)

    if (sender.messages.length === 0) {
      sender.messages = [newMessage.userMessage._id]
      await sender.save()
    }

    if (recipient.messages.length === 0) {
      recipient.messages = [newMessage.recipientMessage._id]
      await recipient.save()
    }

    // messageNamespace.to(recipient.uid).emit('message', newMessage.recipientMessage)

    return res.status(201).json(newMessage.userMessage)
  } catch (e) {
    console.log(e)

    return next(e)
  }
}

async function httpUpdateUser(req: Request<UpdateUserInput[]>, res: Response, next: NextFunction) {
  try {
    const uid = res.locals.user!.uid
    const name = req.body.name
    const username = req.body.username
    const email = req.body.email
    let profileImageUrl = res.locals.user!.profileImageUrl

    if (req.file) {
      profileImageUrl = req.file.path
    }

    const userDetails = {
      uid,
      name,
      username,
      email,
      profileImageUrl,
    } as User

    await updateUser(userDetails)

    if (req.file) {
      deleteFile(res.locals.user!.profileImageUrl)
    }

    return res.status(200).json(userDetails)
  } catch (e) {
    console.log(e)

    return next(e)
  }
}

async function httpDeleteUser(_req: Request, res: Response, next: NextFunction) {
  try {
    deleteFolder(`uploads/users/${res.locals.user!.uid}`)
    await deleteUser(res.locals.user!.uid)

    res.status(201).json({
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
