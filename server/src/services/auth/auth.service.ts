import { Auth } from '../../models/dto/dto'
import authModel from '../../models/auth/auth.mongo'
import { FilterQuery, UpdateQuery } from 'mongoose'

async function createAuth(authDetails: Auth) {
  return await authModel.create(authDetails)
}

async function findAuth(filter: FilterQuery<Auth>) {
  return await authModel.findOne(filter)
}

async function updateAuth(filter: FilterQuery<Auth>, update: UpdateQuery<Auth>) {
  return await authModel.findOneAndUpdate(filter, update)
}

async function deleteAuth(filter: FilterQuery<Auth>) {
  return await authModel.findOneAndDelete(filter)
}

export { findAuth, createAuth, updateAuth, deleteAuth }
