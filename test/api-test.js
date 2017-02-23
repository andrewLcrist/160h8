const assert = require('chai').assert;
const request = require('supertest');
const app = require('../server');

describe('GET /hate', () => {

  beforeEach(() => {
    app.locals.hate = [{ id: 1, name: 'Meeka', offense: 'awesome teaching skills', forgive: true, date: 1487871736688 }];
  });

  afterEach(() => {
    app.locals.hate = [];
  });

  it('should return a 200 status code', (done) => {
  request(app)
    .get('/hate')
    .expect(200, done);
  });

  it('should create a new monster', (done) => {
  const monster = { id: 1, name: 'Steve', level: 2 };

  request(app)
    .post('/hate')
    .send({ hate: hate })
    .expect(201)
    .end(() => {
      assert.deepEqual(app.locals.hate, [hate]);
      done();
    });
});

});
