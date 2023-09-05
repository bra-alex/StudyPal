import { FilterQuery } from 'mongoose'
import { User } from '../../models/dto/dto'
import userModel from '../../models/users/users.mongo'

async function getAllUsers() {
  return await userModel.find(
    {},
    {
      __v: 0,
    },
  )
}

async function getUser(filter: FilterQuery<User>) {
  return await userModel.findOne(filter, {
    __v: 0,
  })
}

async function getUserById(id: string) {
  return await userModel.findById(id)
}

async function getUserMessages(uid: string) {
  return await userModel
    .findOne(
      { uid: uid },
      {
        messages: 1,
      },
    )
    .populate({
      path: 'messages',

      populate: {
        path: 'messages.recipient messages.messages.sender',
        select: '-posts -__v -messages',
      },
    })
}

async function createUser(user: User) {
  const newUser = new userModel(user)
  return await newUser.save()
}

async function updateUser(user: User) {
  return await userModel.findOneAndUpdate({ uid: user.uid }, user)
}

async function deleteUser(uid: string) {
  return await userModel.findOneAndDelete({ uid: uid })
}

export { getUser, createUser, updateUser, deleteUser, getAllUsers, getUserById, getUserMessages }
