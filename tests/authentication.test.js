const { faker } = require('@faker-js/faker');
const request = require('supertest');
const app = require('../server/app');
  
it('POST /register => create an account', () => {
  return request(app)
    .post('/api/authentication/register')
    .send({ name: faker.name.firstName, password: faker.internet.password })
    .expect(200)
    
    .then(res => { console.log(res.headers) });
});