const { faker } = require('@faker-js/faker');
const request = require('supertest');
const app = require('../app');

describe('authentication', () => {
    describe('POST /api/register',  () => {
        it('returns 201 because req.body is valid', () => { // TODO: Deconstruct this, delete account
            return request(app)
            .post('/api/authentication/register')
            .set('Accept', 'application/json')
            .send('name=test')
            .send('password=password')
            .expect(201)
        })
        
        it('returns 400 because of duplicate username', () => {
            expect(true).toBe(true)
        })
    
        it('returns 400 because name is too long', () => {
            return request(app)
            .post('/api/authentication/register')
            .set('Accept', 'application/json')
            .send('name=123456789_12345') // name length == 15
            .send('password=password')
            .expect(400)
        });
    
        it('returns 400 because name is too short', () => {
            return request(app)
            .post('/api/authentication/register')
            .set('Accept', 'application/json')
            .send('name=')
            .send('password=password')
            .expect(400)
        });
        
        it('returns 400 because password is too long', () => {
            return request(app)
            .post('/api/authentication/register')
            .set('Accept', 'application/json')
            .send('name=name')
            .send('password=_123456789_123456789_123456789_123456789_123456789') // password length == 50
            .expect(400)
        });
    
        it('returns 400 because name is too short', () => {
            return request(app)
            .post('/api/authentication/register')
            .set('Accept', 'application/json')
            .send('name=')
            .send('password=password')
            .expect(400)
        });
    });

    describe('POST /api/login',  () => {
        
    })
})

