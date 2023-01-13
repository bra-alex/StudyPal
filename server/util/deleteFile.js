const fs = require('fs')
const path = require('path')

module.exports = (filePath) => {
    filePath = path.join(__dirname, '..', filePath)

    fs.unlink(filePath, (err) => {
        if (err) {
            throw new Error(err)
        }
    })
}