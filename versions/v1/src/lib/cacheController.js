import { setKeyValue, getKeyValue } from 'utils/redisClient'
import cacheClient from 'utils/cacheClient'
import logger from 'utils/logger'
import { cache as config } from '../../../../configs'

/**
 * @version v1
 * @module lib/cacheController
 * @description Returns the cached Value. When cached value is not found, runs the missfire function to retrive value and cache it.
 * @param {String} key The Cache Key
 * @param {Number} expiration milisseconds to expire cache
 * @param {function} missfireFunction Function that retrives value when not found at cache
 * @param {boolean} useLocalCache If needs a local cache
 * @return Value found
 */
/* eslint-disable max-statements */ // already has single responsability
export default async (key, expiration, missfireFunction, useLocalCache = config.general.useInMemory) => {
  if (useLocalCache) {
    const fromCache = cacheClient.get(key)

    if (fromCache !== undefined) {
      logger.debug(`Getting ${key} from 'CacheClient' (${JSON.stringify(fromCache)})`, {scope: 'Cache'})
      return fromCache
    }
  }

  const fromCache = await getKeyValue(key)
  if (fromCache) {
    logger.debug(`Getting ${key} from 'Redis' (${JSON.stringify(fromCache)})`, {scope: 'Cache'})
    cacheClient.set(key, fromCache, expiration)
    return fromCache
  }

  logger.debug(`${key} info is not cached!`, {scope: 'Cache'})
  const result = await missfireFunction()

  cacheClient.set(key, result, expiration)
  await setKeyValue(key, JSON.stringify(result), expiration)

  return result
}
