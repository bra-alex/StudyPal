const User = require('./users.mongo')

async function getAllUsers() {
    try {
        return await User.find({}, {
            'posts': 0,
            '__v': 0
        })
    } catch (e) {
        console.log(e)
        e.status = 500
        e.message = 'Error getting users from the database'
        throw e
    }
}

async function getUser(uid) {
    try {
        return await User.find({ uid: uid }, {
            '__v': 0
        })
    } catch (e) {
        console.log(e)
        e.status = 500
        e.message = 'Error getting user from the database'
        throw e
    }
}

async function createUser(user) {
    try {
        const newUser = new User(user)
        return await newUser.save()
    } catch (e) {
        console.log(e)
        e.status = 400
        e.message = 'Error creating user'
        throw e
    }
}

async function updateUser(user) {
    try {
        return await User.findOneAndUpdate({ uid: uid }, user)
    } catch (e) {
        console.log(e)
        e.status = 500
        e.message = 'Error updating user info'
        throw e
    }
}

async function deleteUser(uid) {
    try {
        return await User.findOneAndDelete({ uid: uid })
    } catch (e) {
        console.log(e)
        e.status = 500
        e.message = 'Error deleting user from the database'
        throw e
    }
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}