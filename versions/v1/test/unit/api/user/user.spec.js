import createServer from 'helpers/create-server'
import sinon from 'sinon'
import jwt from 'utils/create-jwt'
var chai = require("chai");
var expect = chai.expect;
describe('## Users APIs', () => {
  let request
  let sandbox
  let jwtToken
  let userId
  beforeEach(async function () {
    request = await createServer()
    sandbox = sinon.sandbox.create()
  })

  afterEach(function () {
    sandbox.restore()
  })
  describe('POST /v1/register', function () {

    it('should return 200', function (done) {
      request.post('/v1/register')
        .send({"name": "Raphael Santos", "email": "newuser2@test.com", "password": "123456"})
        .expect(200)
        .then(async (res) => {
          userId = res.body.user._id
          jwtToken = await jwt.sign({
            id: userId,
            email: 'newuser2@test.com'
          }, null, false)
          console.log(userId)
					expect(res.body.user).to.be.an("object");
					done();
				})
				.catch(done);
    })
    it('should return 400', function (done) {
      request.post('/v1/register')
        .send({"name": "Raphael Santos", "password": "123456"})
        .expect(400)
				.end(function(err, res) { // eslint-disable-line
					if (err) return done(err);
					done();
				});
    })
  })
  describe('POST /v1/login', function () {

    it('should return 200', function (done) {
      request.post('/v1/login')
      .send({"email": "newuser2@test.com", "password": "123456"})
      .expect(200)
      .then((res) => {
        expect(res.body.user).to.be.an("object");
        done();
      })
      .catch(done);
    })

    it('should return 400', function (done) {
      request.post('/v1/login')
      .send({"email": "newuser2@test.com", "password": "123"})
      .expect(400)
      .end(function(err, res) { // eslint-disable-line
        if (err) return done(err);
        done();
      });
    })
  })
  describe('GET /v1/user', function () {

    it('should return 200', async function () {
      await request.get('/v1/user')
        .set('Authorization', 'Bearer ' + jwtToken)
        .expect(200)
      
    })
  })
})
