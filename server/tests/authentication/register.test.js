const { faker } = require('@faker-js/faker');
const request = require('supertest');
const app = require('../../app');
  
it('POST /register => create an account', () => {
    return request(app)
    .post('/api/authentication/register')
    .set('Accept', 'application/json')
    .send(`name=${faker.name.fullName()}`)
    .send(`password=password`)
    .expect(201)
});

// NAME
it('POST /register => reject because name is too long', () => {
    return request(app)
    .post('/api/authentication/register')
    .set('Accept', 'application/json')
    .send(`name=123456789_12345`) // string length == 15
    .send(`password=password}`)
    .expect(400)
});

it('POST /register => reject because name is too short', () => {
    return request(app)
    .post('/api/authentication/register')
    .set('Accept', 'application/json')
    .send(`name=`)
    .send(`password=password}`)
    .expect(400)
});