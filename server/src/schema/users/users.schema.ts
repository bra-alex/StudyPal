import { TypeOf, object, optional, string } from 'zod'

const userSchema = {
  body: object({
    uid: string({
      required_error: 'Uid is required',
    }),
    name: string({
      required_error: 'Name is required',
    }),
    username: string({
      required_error: 'Username is required',
    }),
    email: string({
      required_error: 'Email is required',
    }),
    password: string({
      required_error: 'Password is required',
    }),
  }),
}

const updateUser = {
  body: object({
    name: optional(string()),
    username: optional(string()),
    email: optional(string()),
    profileImageUrl: optional(string()),
  }),
}

const params = {
  params: object({
    userId: string({
      required_error: 'User Id is required',
    }),
  }),
}

const getUserSchema = object({
  ...params,
})

const createUserSchema = object({
  ...userSchema,
})

const updateUserSchema = object({
  ...params,
  ...updateUser,
})

const deleteUserSchema = getUserSchema

type GetUserInput = TypeOf<typeof getUserSchema>
type CreateUserInput = TypeOf<typeof createUserSchema>
type UpdateUserInput = TypeOf<typeof updateUserSchema>
type DeleteUserInput = TypeOf<typeof deleteUserSchema>

export {
  getUserSchema,
  createUserSchema,
  updateUserSchema,
  deleteUserSchema,
  GetUserInput,
  CreateUserInput,
  UpdateUserInput,
  DeleteUserInput,
}
