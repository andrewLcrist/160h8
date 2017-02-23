const assert = require('chai').assert;
const request = require('supertest');
const app = require('../server');

describe('GET /hateList', () => {

  afterEach(() => {
    app.locals.hateList = [];
  });

  it('should return a 200 status code', (done) => {
  request(app)
    .get('/hateList')
    .expect(200, done);
  });

  it('should create a new hated person', (done) => {
  const hated = { id: 1, name: 'Meeka', offense: 'awesome teaching skills', forgive: true, date: 1487872785747 };

  request(app)
    .post('/hateList')
    .send({ hated: hated })
    .expect(201)
    .end(() => {
      assert.deepEqual(app.locals.hateList, [hated]);
      done();
    });
});

});
