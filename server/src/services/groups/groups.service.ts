import { Groups } from '../../models/dto/dto'
import groupModel from '../../models/groups/groups.mongo'

async function getAllGroups() {
  return await groupModel.find().populate([
    {
      path: 'admin',
      select: {
        posts: 0,
        messages: 0,
        __v: 0,
      },
    },
    {
      path: 'messages',
      populate: {
        path: 'messages.sender',
        select: {
          posts: 0,
          messages: 0,
          __v: 0,
        },
      },
    },
  ])
}

async function getGroup(groupId: string) {
  return await groupModel.findById(groupId).populate([
    {
      path: 'admin members',
      select: {
        posts: 0,
        messages: 0,
        __v: 0,
      },
    },
    {
      path: 'messages',
      populate: {
        path: 'messages.sender',
        select: {
          posts: 0,
          messages: 0,
          __v: 0,
        },
      },
    },
  ])
}

async function getGroupMessages(groupId: string) {
  return await groupModel
    .findById(groupId, {
      messages: 1,
    })
    .populate({
      path: 'messages',
      populate: {
        path: 'messages.sender',
      },
    })
}

async function createGroup(groupDetails: Groups) {
  const group = new groupModel(groupDetails)
  return await group.save()
}

async function deleteGroup(groupId: string) {
  return await groupModel.findByIdAndDelete(groupId)
}

export { getGroup, deleteGroup, createGroup, getAllGroups, getGroupMessages }
