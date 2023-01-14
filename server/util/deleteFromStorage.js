const fs = require('fs')
const path = require('path')

function deleteFile(filePath) {
    filePath = path.join(__dirname, '..', filePath)

    fs.unlink(filePath, (err) => {
        if (err) {
            throw new Error(err)
        }
    })
}

function deleteFolder(folderPath) {
    folderPath = path.join(__dirname, '..', folderPath)

    fs.rmSync(folderPath, { recursive: true, force: true })
}

module.exports = {
    deleteFile,
    deleteFolder
}