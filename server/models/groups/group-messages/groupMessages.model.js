const GroupMessages = require('./groupMessages.mongo')

async function createMessage(message) {
    try {
        const groupMessage = new GroupMessages({
            messages: [
                message
            ]
        })

        return await groupMessage.save()
    } catch (e) {
        console.log(e)
        e.status = 400
        e.message = 'Error getting users from the database'
        throw e
    }
}

async function getMessageById(id) {
    try {
        return await GroupMessages.findById(id)
    } catch (e) {
        console.log(e)
        e.status = 400
        e.message = 'Error getting message from the database'
        throw e
    }
}

async function updateMessages(existingGroupMessages, message) {
    try {
        existingGroupMessages.messages = [...existingGroupMessages.messages, { sender: message.sender, message: message.message }]
        console.log(existingGroupMessages);

        return await GroupMessages.findOneAndUpdate({ id: existingGroupMessages._id }, existingGroupMessages)
    } catch (e) {
        console.log(e)
        e.status = 400
        e.message = 'Error getting users from the database'
        throw e
    }
}

module.exports = {
    createMessage,
    updateMessages,
    getMessageById
}