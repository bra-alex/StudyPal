import { ObjectId } from 'mongoose'
import { MessageInput, Messages } from '../../../models/dto/dto'
import messagesModel from '../../../models/users/messages/messages.mongo'

type MessagesType = Messages & { _id: ObjectId }

async function createMessage(message: MessageInput) {
  const sender = message.sender
  const recipient = message.recipient

  let userMessage: MessagesType
  let recipientMessage: MessagesType

  const userMessages = (await messagesModel.findOne({ sender: sender })) as MessagesType
  const recipientMessages = (await messagesModel.findOne({ sender: recipient })) as MessagesType

  if (!userMessages && !recipientMessages) {
    userMessage = await createUserMessages(sender, recipient, message)
    recipientMessage = await createUserMessages(recipient, sender, message)

    return { userMessage, recipientMessage }
  }

  if (!userMessages && recipientMessages) {
    userMessage = await createUserMessages(sender, recipient, message)
    recipientMessage = (await updatingExistingUserMessage(
      recipientMessages,
      recipient,
      sender,
      message,
    )) as MessagesType

    return { userMessage, recipientMessage }
  }

  if (userMessages && !recipientMessages) {
    userMessage = (await updatingExistingUserMessage(
      userMessages,
      sender,
      recipient,
      message,
    )) as MessagesType
    recipientMessage = await createUserMessages(recipient, sender, message)

    return { userMessage, recipientMessage }
  }

  userMessage = (await updatingExistingUserMessage(
    userMessages,
    sender,
    recipient,
    message,
  )) as MessagesType
  recipientMessage = (await updatingExistingUserMessage(
    recipientMessages,
    recipient,
    sender,
    message,
  )) as MessagesType

  return { userMessage, recipientMessage }
}

async function createUserMessages(sender: string, recipient: string, message: MessageInput) {
  const userMessage = new messagesModel({
    sender,
    messages: [
      {
        recipient,
        messages: [
          {
            sender: message.sender,
            message: message.message,
            date: message.date,
          },
        ],
      },
    ],
  })

  return await (
    await userMessage.save()
  ).populate({
    path: 'messages.recipient messages.messages.sender',
    select: '-posts -__v -messages',
  })
}

async function updatingExistingUserMessage(
  userMessages: MessagesType,
  sender: string,
  recipient: string,
  message: MessageInput,
) {
  const recipientMessages = userMessages!.messages.filter(msg => msg.recipient == recipient)

  let newMessage
  let updatedRecipientMessages

  if (recipientMessages.length === 0) {
    updatedRecipientMessages = [
      ...userMessages!.messages,
      {
        recipient,
        messages: [
          {
            sender: message.sender,
            message: message.message,
            date: message.date,
          },
        ],
      },
    ]
    newMessage = {
      sender,
      messages: updatedRecipientMessages,
    }
  } else {
    const recipientMessage = [...recipientMessages]
    recipientMessage[0].messages.push({
      sender: message.sender,
      message: message.message,
      date: message.date,
    })
    const oldMessages = userMessages!.messages.filter(msg => msg.recipient != recipient)
    updatedRecipientMessages = [...oldMessages, ...recipientMessage]
    // console.log(updatedRecipientMessages);
    newMessage = {
      sender,
      messages: updatedRecipientMessages,
    }
  }

  await messagesModel.findOneAndUpdate({ sender: sender }, newMessage, { upsert: true })

  return await messagesModel.findOne({ sender: sender }).populate({
    path: 'messages.recipient messages.messages.sender',
    select: '-posts -__v -messages',
  })
}

export { createMessage }
