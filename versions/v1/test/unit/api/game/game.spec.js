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

  describe('POST /v1/game', function () {

    it('should return 200', async function () {
      jwtToken = await jwt.sign({
        id: '123',
        email: 'newuser1@test.com'
      }, null, false)
      await request.post('/v1/game')
        .set('Authorization', 'Bearer ' + jwtToken)
        .send({"rows": 5, "cols": 4, "number_mines": 5})
        .expect(200)
    })
    it('should return 400', async function () {
      jwtToken = await jwt.sign({
        id: '123',
        email: 'newuser1@test.com'
      }, null, false)
      await request.post('/v1/game')
        .set('Authorization', 'Bearer ' + jwtToken)
        .send({"rows": 5, "cols": 4})
        .expect(400)
    })
  })
  describe('GET /v1/games', function () {

    it('should return 200', async function () {
      jwtToken = await jwt.sign({
        id: '123',
        email: 'newuser1@test.com'
      }, null, false)
      await request.get('/v1/games')
        .set('Authorization', 'Bearer ' + jwtToken)
        .expect(200)
    })
  })
  describe('DELETE /v1/game/:id', function () {

    /* it('should return 200', async function () {
      jwtToken = await jwt.sign({
        id: '123',
        email: 'newuser1@test.com'
      }, null, false)
      await request.delete('/v1/game/111')
        .set('Authorization', 'Bearer ' + jwtToken)
        .expect(200)
    }) */
    it('should return 500 -> wrong ID', async function () {
      jwtToken = await jwt.sign({
        id: '123',
        email: 'newuser1@test.com'
      }, null, false)
      await request.delete('/v1/game/111')
        .set('Authorization', 'Bearer ' + jwtToken)
        .expect(500)
    })
  })
  describe('POST /v1/game/:id/mark', function () {

    /* it('should return 200', async function () {
      jwtToken = await jwt.sign({
        id: '123',
        email: 'newuser1@test.com'
      }, null, false)
      await request.post('/v1/game/111/mark')
        .set('Authorization', 'Bearer ' + jwtToken)
        .send({"row": 5, "col": 4, "type": "R"})
        .expect(200)
    }) */
    it('should return 500 -> wrong ID', async function () {
      jwtToken = await jwt.sign({
        id: '123',
        email: 'newuser1@test.com'
      }, null, false)
      await request.post('/v1/game/111/mark')
        .set('Authorization', 'Bearer ' + jwtToken)
        .send({"row": 5, "col": 4, "type": "R"})
        .expect(500)
    })
  })
})
