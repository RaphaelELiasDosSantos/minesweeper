import cacheController from '../../../src/lib/cacheController'
import redisClient from 'utils/redisClient'
import { assert } from 'chai'

describe('Skeleton API 1 - CacheController test', function () {
  it('get information from cache', async function () {
    redisClient.flushdb()

    const firstCache = await cacheController('cache-test', 10, () => {
      return 'test-ok'
    }, true)

    const secondCache = await cacheController('cache-test', 10, () => {
      return 'test-ok'
    }, true)

    const thirdCache = await cacheController('cache-test', 10, () => {
      return 'test-ok'
    }, false)

    assert.equal(firstCache, 'test-ok')
    assert.equal(secondCache, 'test-ok')
    assert.equal(thirdCache, 'test-ok')
  })
})
