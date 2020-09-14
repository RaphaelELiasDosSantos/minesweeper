import createServer from 'helpers/create-server'
import sinon from 'sinon'
import jwt from 'utils/create-jwt'
import redisClient from 'utils/redisClient'
import cacheClient from 'utils/cacheClient'
describe('## Skeleton APIs', () => {
  let request
  let sandbox
  let jwtToken

  beforeEach(async function () {
    request = await createServer()
    sandbox = sinon.sandbox.create()
  })

  afterEach(function () {
    sandbox.restore()
    redisClient.flushdb()
    cacheClient.reset()
  })

  describe('GET /v1/example', function () {

    it('should return 200', async function () {
      jwtToken = await jwt.sign({
        email: 'raphael.santos@ingaia.com.br'
      }, null, false)

      await request.get('/v1/example')
        .set('Authorization', 'Bearer ' + jwtToken)
        .expect(200)
    })
  })
})
