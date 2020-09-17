import createServer from 'helpers/create-server'
import sinon from 'sinon'
import jwt from 'utils/create-jwt'
var chai = require("chai");
var expect = chai.expect;
const configs = require("../../../../../../configs");
const mongoose = require("mongoose");
const Cleaner = require("database-cleaner");
const dbCleaner = new Cleaner("mongodb");
const {
  User
} = require("../../../../../../server/models");
global.dbCleaner = dbCleaner;
const rootUser = {
  name: "Raphael Santos",
  password: "123456",
  email: "newuser1@test.com"
};
describe('## Games APIs', () => {
  let request
  let sandbox
  let jwtToken
  let user1
  let gameId
  beforeEach(async function () {
    request = await createServer()
    sandbox = sinon.sandbox.create()
  })

  afterEach(function () {
    sandbox.restore()
  })
  before(async (done) => {
		mongoose.connect(configs.mongo.url, { useNewUrlParser: true }, function () {
			/*dbCleaner.clean(mongoose.connection.db, () => {
				done();
      });*/
      done();
    });
	});
	/* after(function (done) {
		dbCleaner.clean(mongoose.connection.db, () => {
			mongoose.models = {};
			mongoose.modelSchemas = {};
      mongoose.connection.close();
      done();
		});
  }); */
  it("Seeder", async function() {
    let user3 = await User.findOne({email: {$regex: new RegExp("newuser2@test.com", 'i')}})
    if (user3) {
      await user3.remove()
    }
    let user2 = await User.findOne({email: {$regex: new RegExp("newuser1@test.com", 'i')}})
    if (user2) {
      user1 = user2
      jwtToken = await jwt.sign({
        id: user1._id,
        email: 'newuser1@test.com'
      }, null, false)
    } else {
      user1 = new User(rootUser)
      user1.setPassword(rootUser.password)
      jwtToken = await jwt.sign({
        id: user1._id,
        email: 'newuser1@test.com'
      }, null, false)
      await user1.save()
    }
	});
  describe('POST /v1/game', function () {

    it('should return 200', function (done) {
      
      request.post('/v1/game')
        .set('Authorization', 'Bearer ' + jwtToken)
        .send({"rows": 5, "cols": 4, "number_mines": 5})
        .expect(200)
        .then((res) => {
          gameId = res.body.id
					expect(res.body.view_board).to.be.an("array");
					done();
				})
				.catch(done);
    })
    it('should return 400', function (done) {
      request.post('/v1/game')
        .set('Authorization', 'Bearer ' + jwtToken)
        .send({"rows": 5, "cols": 4})
        .expect(400)
        .end(function(err, res) { // eslint-disable-line
          if (err) return done(err);
          done();
        });
    })
  })
  describe('GET /v1/games', function () {

    it('should return 200', function (done) {
      request.get('/v1/games')
        .set('Authorization', 'Bearer ' + jwtToken)
        .expect(200)
        .then((res) => {
					expect(res.body.games).to.be.an("array");
					done();
				})
				.catch(done);
    })
  })
  describe('POST /v1/game/:id/mark', function () {

    it('should return 200', function (done) {
      request.post('/v1/game/' + gameId + '/mark')
        .set('Authorization', 'Bearer ' + jwtToken)
        .send({"row": 2, "col": 3, "type": "R"})
        .expect(200)
        .then((res) => {
					expect(res.body.view_board).to.be.an("array");
					done();
				})
				.catch((err) => {
          console.log(err)
          done();
        });
    })
    it('should return 500 -> wrong ID', function (done) {
      request.post('/v1/game/111/mark')
        .set('Authorization', 'Bearer ' + jwtToken)
        .send({"row": 5, "col": 4, "type": "R"})
        .expect(500)
        .end(function(err, res) { // eslint-disable-line
          if (err) return done(err);
          done();
        });
    })
  })
  describe('DELETE /v1/game/:id', function () {
    it('should return 200', async function () {
      await request.delete('/v1/game/' + gameId)
        .set('Authorization', 'Bearer ' + jwtToken)
        .expect(200)
    })
    it('should return 500 -> wrong ID', function (done) {
      request.delete('/v1/game/111')
        .set('Authorization', 'Bearer ' + jwtToken)
        .expect(500)
        .end(function(err, res) { // eslint-disable-line
          if (err) return done(err);
          done();
        });
    })
  })
})
