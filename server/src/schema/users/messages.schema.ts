import { TypeOf, object, string } from 'zod'

const messagesSchema = {
  body: object({
    message: string({
      required_error: 'Message is required',
    }),
    recipient: string({
      required_error: 'Recipient is required',
    }),
  }),
}

const params = {
  params: object({
    userId: string({
      required_error: 'User Id is required',
    }),
  }),
}

const getUserMessagesSchema = object({
  ...params,
})

const createUserMessageSchema = object({
  ...params,
  ...messagesSchema,
})

type GetUserMessagesInput = TypeOf<typeof getUserMessagesSchema>
type CreateUserMessageInput = TypeOf<typeof createUserMessageSchema>

export {
  getUserMessagesSchema,
  createUserMessageSchema,
  GetUserMessagesInput,
  CreateUserMessageInput,
}
