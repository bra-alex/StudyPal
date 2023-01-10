const Messages = require('./messages.mongo')

async function getAllMessages(sender) {
    try {
        return await Messages.find({ sender: sender })
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
        let userMessage;
        let recipientMessage;
        const userMessages = await Messages.findOne({ sender: sender })
        const recipientMessages = await Messages.findOne({ recipient: recipient })

        if (!userMessages && !recipientMessages) {
            userMessage = await createUserMessages(sender, recipient, msg, date)
            recipientMessage = await createUserMessages(recipient, sender, msg, date)

            return userMessage
        }

        if (!userMessages && recipientMessages) {
            userMessage = await createUserMessages(sender, recipient, msg, date)
            recipientMessage = await updatingExistingUserMessage(recipientMessages, recipient, sender, msg, date)

            return userMessage
        }

        if (userMessages && !recipientMessages) {
            userMessage = await updatingExistingUserMessage(userMessages, sender, recipient, msg, date)
            recipientMessage = await createUserMessages(recipient, sender, msg, date)

            return userMessage
        }

        userMessage = await updatingExistingUserMessage(userMessages, sender, recipient, msg, date)
        recipientMessage = await updatingExistingUserMessage(recipientMessages, recipient, sender, msg, date)

        return userMessage
    } catch (e) {
        console.log(e)
        e.status = 400
        e.message = 'Error saving message to the database'
        throw e
    }
}

async function createUserMessages(sender, recipient, message, date) {
    const userMessage = new Messages({
        sender,
        messages: [
            {
                recipient,
                messages: [
                    {
                        sender,
                        message,
                        date
                    }
                ]
            }
        ]
    })

    return await userMessage.save()
}

async function updatingExistingUserMessage(userMessages, sender, recipient, message, date) {
    const recipientMessages = userMessages.messages.filter(msg => msg.recipient === recipient)

    let newMessage;
    let updatedRecipientMessages;

    if (recipientMessages.length === 0) {
        updatedRecipientMessages = [
            ...userMessages.messages,
            {
                recipient,
                messages: [
                    {
                        sender,
                        message,
                        date
                    }
                ]
            }
        ]
        newMessage = {
            sender,
            messages: updatedRecipientMessages
        }
    } else {
        const recipientMessage = [...recipientMessages]
        recipientMessage.push({ sender, message, date })
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