import jwt from 'jsonwebtoken'
import config from '../../configs'
import logger from 'utils/logger'

export default {
  sign,
  getInfosInToken
}

async function sign (payload, secret, appendBearer = true) {
  try {
    if (!secret) {
      secret = config.jwt.secret
    }

    const token = jwt.sign(payload, secret)
    const bearer = appendBearer ? `Bearer ${token}` : token
    return bearer
  } catch (err) {
    logger.error('createJWT error:', err)
    throw err
  }
}

async function getInfosInToken (token, secret) {
  try {
    if (!secret) {
      secret = config.jwt.secret
    }
    token = token.replace('Bearer ', '')
    const decode = jwt.verify(token, secret)

    return decode
  } catch (err) {
    throw new Error('ERROR:10')
  }
}
