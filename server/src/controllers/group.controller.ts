import { NextFunction, Request, Response } from 'express'

import { GroupMessages, Groups, User } from '../models/dto/dto'
import { socketConnection } from '../sockets'
import { getUserById } from '../services/users/users.service'
import { CreateGroupInput } from '../schema/groups/groups.schema'
import { CreateGroupMessageInput } from '../schema/groups/groupMessages.schema'

import {
  createGroup,
  deleteGroup,
  getAllGroups,
  getGroupMessages,
} from '../services/groups/groups.service'

import {
  createMessage,
  getMessageById,
  updateMessages,
} from '../services/groups/group_messages/groupMessage.service'

const groupNamespace = socketConnection.groupsNamespace().groupsNamespace

async function httpGetAllGroups(_req: Request, res: Response, next: NextFunction) {
  try {
    let groups = await getAllGroups()

    groups = groups.filter(g => g.isPublic === true || g.members.includes(res.locals.user!._id))

    res.status(200).json(groups)
  } catch (e) {
    next(e)
  }
}

async function httpGetGroup(_req: Request, res: Response, next: NextFunction) {
  try {
    res.status(200).json(res.locals.group)
  } catch (e) {
    next(e)
  }
}

async function httpGetGroupMessages(_req: Request, res: Response, next: NextFunction) {
  try {
    const groupMessages = await getGroupMessages(res.locals.group!._id)

    res.status(200).json(groupMessages)
  } catch (e) {
    next(e)
  }
}

async function httpCreateGroup(
  req: Request<{}, {}, CreateGroupInput['body']>,
  res: Response,
  next: NextFunction,
) {
  try {
    const createdGroup = await createGroup(req.body as Groups)

    createdGroup.members.forEach(async member => {
      const user = await getUserById(member as string)
      if (user)
        groupNamespace.to(user.uid).emit('group', {
          action: 'create',
          group: createdGroup,
        })
    })

    res.status(201).json(createdGroup)
  } catch (e) {
    next(e)
  }
}

async function httpCreateGroupMessage(
  req: Request<{}, {}, CreateGroupMessageInput['body']>,
  res: Response,
  next: NextFunction,
) {
  try {
    let groupMessages: GroupMessages & { _id: string }

    const message = req.body

    const existingGroupMessages = await getMessageById(res.locals.group!.messages!)

    if (!existingGroupMessages) {
      groupMessages = await createMessage(message)
    } else {
      groupMessages = (await updateMessages(existingGroupMessages, message))!
    }

    if (!res.locals.group!.messages) {
      res.locals.group!.messages = groupMessages!._id
      await res.locals.group!.save()
    }

    // Listener leak
    //TODO: Fix Listener leak

    const recipients = res.locals
      .group!.members.filter(member => {
        if (typeof member !== 'string') return member._id.toString() !== message.sender
        return member !== message.sender
      })
      .map(member => (member as User).uid)

    socketConnection
      .groupsNamespace()
      .socket.to(res.locals.group!._id.toString())
      .emit('message', groupMessages)
    groupNamespace.to(res.locals.group!._id.toString()).emit('message', groupMessages)
    console.log(recipients)
    groupNamespace.to(recipients).emit('message', groupMessages)

    res.locals.group!.members.forEach(async member => {
      if ((member as User)._id.toString() !== message.sender) {
        const user = await getUserById(member as string)
        groupNamespace.to(user!.uid).emit('message', groupMessages)
      }
    })

    res.status(201).json(groupMessages)
  } catch (e) {
    console.log(e)

    next(e)
  }
}

async function httpDeleteGroup(_req: Request, res: Response, next: NextFunction) {
  try {
    await deleteGroup(res.locals.group!._id)

    res.locals.group!.members.forEach(async member => {
      const user = await getUserById(member as string)
      groupNamespace.to(user?.uid ?? '').emit('group', {
        action: 'delete',
        group: res.locals.group!._id,
      })
    })

    return res.status(200).json({
      message: 'Group Deleted',
    })
  } catch (e) {
    return next(e)
  }
}

export {
  httpGetGroup,
  httpCreateGroup,
  httpDeleteGroup,
  httpGetAllGroups,
  httpGetGroupMessages,
  httpCreateGroupMessage,
}
