const Messages = require('./messages.mongo')

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

            return { userMessage, recipientMessage }
        }

        if (!userMessages && recipientMessages) {
            userMessage = await createUserMessages(sender, recipient, msg, date)
            recipientMessage = await updatingExistingUserMessage(recipientMessages, recipient, sender, msg, date)

            return { userMessage, recipientMessage }
        }

        if (userMessages && !recipientMessages) {
            userMessage = await updatingExistingUserMessage(userMessages, sender, recipient, msg, date)
            recipientMessage = await createUserMessages(recipient, sender, msg, date)

            return { userMessage, recipientMessage }
        }

        userMessage = await updatingExistingUserMessage(userMessages, sender, recipient, msg, date)
        recipientMessage = await updatingExistingUserMessage(recipientMessages, recipient, sender, msg, date)

        return { userMessage, recipientMessage }
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
    const recipientMessages = userMessages.messages.filter(msg => msg.recipient == recipient)

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
        recipientMessage[0].messages.push({ sender, message, date })
        const oldMessages = userMessages.messages.filter(msg => msg.recipient != recipient)
        updatedRecipientMessages = [...oldMessages, ...recipientMessage]
        // console.log(updatedRecipientMessages);
        newMessage = {
            sender,
            messages: updatedRecipientMessages
        }
    }

    return await Messages.findOneAndUpdate({ sender: sender }, newMessage, { upsert: true })
}

module.exports = {
    createMessage
}