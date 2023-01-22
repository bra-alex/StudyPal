const bcrypt = require('bcrypt')

async function encryptPassword(password) {
    return await bcrypt.hash(password, 12)
}

async function decryptPassword(password, oldPassword) {
    return await bcrypt.compare(password, oldPassword)
}

module.exports = {
    encryptPassword,
    decryptPassword
}