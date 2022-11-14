const { faker } = require('@faker-js/faker');
const request = require('supertest');
const app = require('../../app');
  
it('POST /register => create an account', () => {
  return request(app)
    .post('/api/authentication/register')
    .send(`name=${faker.name.firstName()}`)
    .send(`password=${faker.internet.password()}`)
    .set('Accept', 'application/json')
    .expect(201)
});