import LRUCache from 'lru-cache'
import configs from '../../configs'
import logger from 'utils/logger'
import { isString } from 'lodash'

export const cacheClient = LRUCache({
  max: configs.cache.customer.max_length,
  maxAge: configs.cache.customer.max_age,
  length: (n, key) => isString(n) ? Buffer.byteLength(n, 'utf-8') : 1
})

logger.debug('CACHE MAX LENGH: ' + configs.cache.customer.max_length)
logger.debug('CACHE MAX AGE: ' + configs.cache.customer.max_age)

export default cacheClient
