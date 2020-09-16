import createServer from 'helpers/create-server'
import sinon from 'sinon'
import jwt from 'utils/create-jwt'
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
  })
  describe('POST /v1/register', function () {

    it('should return 200', async function () {
      await request.post('/v1/register')
        .send({"name": "Raphael Santos", "email": "newuser1@test.com", "password": "123456"})
        .expect(200)
    })
    it('should return 400', async function () {
      await request.post('/v1/register')
        .send({"name": "Raphael Santos", "password": "123456"})
        .expect(400)
    })
  })
  describe('POST /v1/login', function () {

    it('should return 200', async function () {
      await request.post('/v1/login')
      .send({"email": "newuser1@test.com", "password": "123456"})
      .expect(200)
    })

    it('should return 400', async function () {
      await request.post('/v1/login')
      .send({"email": "newuser1@test.com", "password": "123"})
      .expect(400)
    })
  })
  describe('GET /v1/user', function () {

    it('should return 200', async function () {
      jwtToken = await jwt.sign({
        id: '123',
        email: 'newuser1@test.com'
      }, null, false)

      await request.get('/v1/user')
        .set('Authorization', 'Bearer ' + jwtToken)
        .expect(200)
      
    })
  })
})
