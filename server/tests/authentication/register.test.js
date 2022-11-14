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

it('POST /register => reject because name is too long', () => {
  return request(app)
    .post('/api/authentication/register')
    .send(`name=123456789_12345`) // string length == 15
    .send(`password=${faker.internet.password()}`)
    .expect(400)
});