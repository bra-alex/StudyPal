const Groups = require('./groups.mongo')

async function getAllGroups() {
    try {
        return await Groups.find()
            .populate([
                {
                    path: 'admin',
                    select: {
                        posts: 0,
                        messages: 0,
                        __v: 0
                    },
                },
                {
                    path: 'messages',
                    populate: {
                        path: 'messages.sender',
                        select: {
                            posts: 0,
                            messages: 0,
                            __v: 0
                        }
                    }
                }
            ])
    } catch (err) {
        console.log(err)
        const e = new Error(err)
        e.status = 500
        e.message = 'Error getting groups from the database'
        throw e
    }
}

async function getGroup(groupId) {
    try {
        return await Groups.findById(groupId)
            .populate([
                {
                    path: 'admin members',
                    select: {
                        posts: 0,
                        messages: 0,
                        __v: 0
                    },
                },
                {
                    path: 'messages',
                    populate: {
                        path: 'messages.sender',
                        select: {
                            posts: 0,
                            messages: 0,
                            __v: 0
                        }
                    }
                }
            ])
    } catch (err) {
        console.log(err)
        const e = new Error(err)
        e.status = 500
        e.message = 'Error getting groups from the database'
        throw e
    }
}

async function getGroupMessages(groupId) {
    try {
        return await Groups.findById(groupId, {
            'messages': 1
        })
            .populate({
                path: 'messages',
                populate: {
                    path: 'messages.sender'
                }
            })
    } catch (err) {
        console.log(err)
        const e = new Error(err)
        e.status = 500
        e.message = 'Error getting group messages from the database'
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
        e.message = 'Error adding group to the database'
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
        e.message = 'Error deleting group from the database'
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