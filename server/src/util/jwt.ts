import config from 'config'
import jwt from 'jsonwebtoken'

const privateKey = config.get<string>('jwt_private_key')
const publicKey = config.get<string>('jwt_public_key')

function signJWT(payload: object, options?: jwt.SignOptions) {
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  })
}

function validateJWT(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey)
    return {
      valid: true,
      expired: false,
      decoded,
    }
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message == 'jwt expired',
      decoded: null,
    }
  }
}

export { signJWT, validateJWT }
