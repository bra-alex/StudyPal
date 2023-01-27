const User = require('./users.mongo')

async function getAllUsers() {
    try {
        return await User.find({}, {
            '__v': 0
        })
    } catch (err) {
        console.log(err)
        const e = new Error(err)
        e.status = 500
        e.message = 'Error getting users from the database'
        throw e
    }
}

async function getUser(uid) {
    try {
        return await User.findOne({ uid: uid }, {
            '__v': 0
        })
    } catch (err) {
        console.log(err)
        const e = new Error(err)
        e.status = 500
        e.message = 'Error getting user from the database'
        throw e
    }
}

async function getUserById(id) {
    try {
        return await User.findById(id)
    } catch (err) {
        console.log(err)
        const e = new Error(err)
        e.status = 500
        e.message = 'Error getting user from the database'
        throw e
    }
}

async function getUserMessages(uid) {
    try {
        return await User.findOne({ uid: uid }, {
            'messages': 1
        })
            .populate({
                path: 'messages',

                populate: {
                    path: 'messages.recipient messages.messages.sender',
                    select: '-posts -__v -messages'
                },
            })
    } catch (err) {
        console.log(err)
        const e = new Error(err)
        e.status = 500
        e.message = 'Error getting user messages from the database'
        throw e
    }
}

async function createUser(user) {
    try {
        const newUser = new User(user)
        return await newUser.save()
    } catch (err) {
        console.log(err)
        const e = new Error(err)
        e.status = 400
        e.message = 'Error creating user'
        throw e
    }
}

async function updateUser(user) {
    try {
        return await User.findOneAndUpdate({ uid: user.uid }, user)
    } catch (err) {
        console.log(err)
        const e = new Error(err)
        e.status = 400
        e.message = 'Error updating user info'
        throw e
    }
}

async function deleteUser(uid) {
    try {
        return await User.findOneAndDelete({ uid: uid })
    } catch (err) {
        console.log(err)
        const e = new Error(err)
        e.status = 500
        e.message = 'Error deleting user from the database'
        throw e
    }
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getUserById,
    getUserMessages
}