import bcrypt from 'bcrypt'

async function encryptPassword(password: string) {
  return await bcrypt.hash(password, 12)
}

async function decryptPassword(password: string, oldPassword: string) {
  return await bcrypt.compare(password, oldPassword)
}

export { encryptPassword, decryptPassword }
