import { GroupMessages, GroupMessagesData } from '../../../models/dto/dto'
import groupMessagesModel from '../../../models/groups/group_messages/groupMessages.mongo'

async function createMessage(message: GroupMessagesData) {
  const groupMessage = new groupMessagesModel({
    messages: [message],
  })

  return await groupMessage.save()
}

async function getMessageById(id: string) {
  return await groupMessagesModel.findById(id)
}

async function updateMessages(existingGroupMessages: GroupMessages, message: GroupMessagesData) {
  existingGroupMessages.messages = [
    ...existingGroupMessages.messages,
    { sender: message.sender, message: message.message },
  ]
  // console.log(existingGroupMessages);

  await groupMessagesModel.findOneAndUpdate(
    { id: existingGroupMessages._id },
    existingGroupMessages,
  )

  return await groupMessagesModel
    .findById(existingGroupMessages._id)
    .populate('messages.sender', '-messages -posts -__v')
}

export { createMessage, updateMessages, getMessageById }
