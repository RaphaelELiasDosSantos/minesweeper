import createServer from 'helpers/create-server'
import loadJsons from 'helpers/load-jsons'
import jwt from 'utils/create-jwt'

describe('GET /v1/health', function () {
  let request
  let jwtToken

  beforeEach(async function () {
    request = await createServer()
  })

  it('Get an OK', async function () {
    jwtToken = await jwt.sign({
      email: 'test-email'
    }, null, false)
    let expected = await loadJsons('expected/health/health-success.json')

    await request.get('/v1/health')
      .set('authorization', 'Bearer ' + jwtToken)
      .expect(200, expected)
  })
})
