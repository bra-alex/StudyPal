import fs from 'fs'
import path from 'path'

function deleteFile(filePath: string) {
  filePath = path.join(__dirname, '..', '..', filePath)

  fs.unlink(filePath, err => {
    if (err) {
      throw err
    }
  })
}

function deleteFolder(folderPath: string) {
  folderPath = path.join(__dirname, '..', '..', folderPath)

  fs.rmSync(folderPath, { recursive: true, force: true })
}

export { deleteFile, deleteFolder }
