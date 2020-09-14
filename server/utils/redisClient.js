import redis from 'redis'
import configs from '../../configs'
import logger from 'utils/logger'

export const redisClient = redis.createClient(
  configs.redis.port,
  configs.redis.host
)

logger.debug('REDIS PORT: ' + configs.redis.port)
logger.debug('REDIS HOST: ' + configs.redis.host)

redisClient.on('error', (e) => {
  logger.debug('ERR: ' + e)
})

redisClient.on('end', () => {
  logger.debug('Redis connection closed')
})

/**
 * @module utils/redisClient
 * @method [utils/redisClient] setKeyValue
 * @description Saves token on Redis, and sets it's expiration
 * @param {Number} key
 * @param {Number} value - token
 * @param {Number} token - expiration
 */
export async function setKeyValue (key, value, expiration) {
  await redisClient.set(key, value)
  await redisClient.expire(key, expiration)
}

 /**
 * @module utils/redisClient
 * @method [utils/redisClient] getKeyValue
 * @description Returns a value from a redis key
 * @param {String} key
 */
export async function getKeyValue (key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, value) => {
      if (err) {
        logger.debug('Redis get an error on get method')
        return resolve(null)
      }
      resolve(JSON.parse(value))
    })
  })
}

/**
 * @module utils/redisClient
 * @method [utils/redisClient] removeCache
 * @description Remove cache from redis
 * @param {String} key
 */
export function removeCache (key) {
  return new Promise((resolve, reject) => {
    redisClient.del(key, (err) => {
      if (err) return reject()
      resolve()
    })
  })
}

export default redisClient
