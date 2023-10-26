import { TypeOf, array, boolean, number, object, optional, string } from 'zod'

const groupsSchema = {
  body: object({
    name: string({
      required_error: 'Group Name is required',
    }),
    messages: optional(string()),
    members: array(
      string({
        required_error: 'At least one user must be added to the group',
      }),
    ),
    joinCode: optional(number()),
    isPublic: boolean({
      required_error: 'Is Public is required',
    }),
  }),
}

const params = {
  params: object({
    groupId: string({
      required_error: 'Group Id is required',
    }),
  }),
}

const createGroupSchema = object({
  ...groupsSchema,
})

const getGroupSchema = object({
  ...params,
})

const deleteGroupSchema = getGroupSchema

type CreateGroupInput = TypeOf<typeof createGroupSchema>
type GetGroupInput = TypeOf<typeof getGroupSchema>
type DeleteGroupInput = TypeOf<typeof deleteGroupSchema>

export {
  createGroupSchema,
  getGroupSchema,
  deleteGroupSchema,
  CreateGroupInput,
  GetGroupInput,
  DeleteGroupInput,
}
