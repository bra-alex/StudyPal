import { TypeOf, object, string } from 'zod'

const groupMessagesShema = {
  body: object({
    message: string({
      required_error: 'Message is required',
    }),
    sender: string({
      required_error: 'Sender is required',
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

const createGroupMessageSchema = object({
  ...groupMessagesShema,
  ...params,
})

const getGroupMessagesSchema = object({
  ...params,
})

type CreateGroupMessageInput = TypeOf<typeof createGroupMessageSchema>
type GetGroupMessagesInput = TypeOf<typeof getGroupMessagesSchema>

export {
  getGroupMessagesSchema,
  createGroupMessageSchema,
  GetGroupMessagesInput,
  CreateGroupMessageInput,
}
