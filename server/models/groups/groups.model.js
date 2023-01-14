const Groups = require('./groups.mongo')

async function getAllGroups() {
    try {
        return await Groups.find()
    } catch (err) {
        console.log(err)
        const e = new Error(err)
        e.status = 500
        e.message = 'Error getting users from the database'
        throw e
    }
}

async function getGroup(groupId) {
    try {
        return await Groups.findById(groupId).populate('members', ['name', 'username'])
    } catch (err) {
        console.log(err)
        const e = new Error(err)
        e.status = 500
        e.message = 'Error getting users from the database'
        throw e
    }
}

async function getGroupMessages(groupId) {
    try {
        return await Groups.findById(groupId, {
            'messages': 1
        })
            .populate('messages')
    } catch (err) {
        console.log(err)
        const e = new Error(err)
        e.status = 500
        e.message = 'Error getting users from the database'
        throw e
    }
}

async function createGroup(groupDetails) {
    try {
        const group = new Groups(groupDetails)
        return await group.save()
    } catch (err) {
        console.log(err)
        const e = new Error(err)
        e.status = 400
        e.message = 'Error getting users from the database'
        throw e
    }
}

async function deleteGroup(groupId) {
    try {
        return await Groups.findByIdAndDelete(groupId)
    } catch (err) {
        console.log(err)
        const e = new Error(err)
        e.status = 500
        e.message = 'Error getting users from the database'
        throw e
    }
}

module.exports = {
    getGroup,
    deleteGroup,
    createGroup,
    getAllGroups,
    getGroupMessages
}