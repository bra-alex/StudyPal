import { FilterQuery, ObjectId } from 'mongoose'
import { MessageInput, Messages } from '../../../models/dto/dto'
import messagesModel from '../../../models/users/messages/messages.mongo'

type MessagesType = Messages & { _id: ObjectId }

async function createMessage(message: MessageInput) {
  const sender = message.sender
  const recipient = message.recipient
  let userMessages = await messagesModel.findOne({ sender: sender })
  let recipientMessages = await messagesModel.findOne({ sender: recipient })

  if (!userMessages && !recipientMessages) {
    userMessages = await createUserMessages(sender, recipient, message)
    recipientMessages = await createUserMessages(recipient, sender, message)

    return { userMessages, recipientMessages }
  }

  if (!userMessages && recipientMessages) {
    userMessages = await createUserMessages(sender, recipient, message)
    recipientMessages = await updatingExistingUserMessage(
      recipientMessages,
      recipient,
      sender,
      message,
    )

    return { userMessages, recipientMessages }
  }

  if (userMessages && !recipientMessages) {
    userMessages = await updatingExistingUserMessage(userMessages, sender, recipient, message)
    recipientMessages = await createUserMessages(recipient, sender, message)

    return { userMessages, recipientMessages }
  }

  userMessages = await updatingExistingUserMessage(userMessages, sender, recipient, message)
  recipientMessages = await updatingExistingUserMessage(
    recipientMessages,
    recipient,
    sender,
    message,
  )

  return { userMessages, recipientMessages }
}

async function createUserMessages(sender: string, recipient: string, message: MessageInput) {
  const userMessages = new messagesModel({
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

  return await userMessages.save()
}

async function updatingExistingUserMessage(
  userMessages: MessagesType | null,
  sender: string,
  recipient: string,
  message: MessageInput,
) {
  const recipientMessages = userMessages!.messages.filter(
    msg => msg.recipient.toString() === recipient.toString(),
  )

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
    const oldMessages = userMessages!.messages.filter(
      msg => msg.recipient.toString() !== recipient.toString(),
    )
    updatedRecipientMessages = [...oldMessages, ...recipientMessage]
    newMessage = {
      sender,
      messages: updatedRecipientMessages,
    }
  }

  return await messagesModel.findOneAndUpdate({ sender: sender }, newMessage, {
    upsert: true,
    new: true,
  })
}

async function deleteUserMessages(filter: FilterQuery<Messages>) {
  return await messagesModel.findOneAndDelete(filter)
}

export { createMessage, deleteUserMessages }
