const Messages = require('./messages.mongo')

async function getAllMessages() {
    try {
        return await Messages.find()
    } catch (e) {
        console.log(e)
        e.status = 500
        e.message = 'Error getting messages from the database'
        throw e
    }
}

async function createMessage(message) {
    const sender = message.sender
    const recipient = message.recipient
    const msg = message.message
    const date = message.date

    try {
        const userMessages = await Messages.findOne({ sender: sender })
        if (!userMessages) {
            const newMessage = new Messages({
                sender,
                messages: [
                    {
                        recipient,
                        messages: [
                            {
                                message: msg,
                                date
                            }
                        ]
                    }
                ]
            })
            return await newMessage.save()
        }
        return await updatingExistingMessage(userMessages, sender, recipient, msg, date)
    } catch (e) {
        console.log(e)
        e.status = 400
        e.message = 'Error saving message to the database'
        throw e
    }
}

async function updatingExistingMessage(userMessages, sender, recipient, message, date) {
    const recipientMessages = userMessages.messages.filter(msg => msg.recipient === recipient)

    let newMessage;
    let updatedRecipientMessages;

    if (recipientMessages.length === 0) {
        updatedRecipientMessages = [...userMessages.messages, { recipient, messages: [{ message, date }] }]
        newMessage = {
            sender,
            messages: updatedRecipientMessages
        }
    } else {
        const recipientMessage = { ...recipientMessages }
        recipientMessage.messages.push({ message, date })
        updatedRecipientMessages = [...userMessages.messages, recipientMessage]
        newMessage = {
            sender,
            messages: updatedRecipientMessages
        }
    }

    return await Messages.findOneAndUpdate({ sender: sender }, newMessage, { upsert: true })
}

module.exports = {
    getAllMessages,
    createMessage
}