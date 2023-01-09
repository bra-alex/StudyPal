const Groups = require('./groups.mongo')

async function getAllGroups() {
    try {
        return await Groups.find()
    } catch (e) {
        console.log(e)
        e.status = 500
        e.message = 'Error getting users from the database'
        throw e
    }
}

async function createGroup(groupDetails) {
    try {
        const group = new Groups(groupDetails)
        return await group.save()
    } catch (e) {
        console.log(e)
        e.status = 400
        e.message = 'Error getting users from the database'
        throw e
    }
}

module.exports = {
    getAllGroups,
    createGroup
}