import { Auth } from '../../models/dto/dto'
import authModel from '../../models/auth/auth.mongo'
import { FilterQuery } from 'mongoose'

async function createAuth(authDetails: Auth) {
  return await authModel.create(authDetails)
}

async function findAuth(filter: FilterQuery<Auth>) {
  return await authModel.findOne(filter)
}

export { findAuth, createAuth }
