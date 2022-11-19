const userModel = require('../models/user-model');
const UserModel = require('../models/user-model')
const request = require('supertest');
const app = require('../app');

describe('authentication', () => {
    describe('POST /api/register',  () => {
        afterAll(async () => {
            await UserModel.deleteMany({ name: 'name' })
        })

        it('returns 201 because req.body is valid', () => {
            return request(app)
            .post('/api/authentication/register')
            .set('Accept', 'application/json')
            .send('name=name')
            .send('password=password')
            .expect(201)
        })
        
        it('returns 400 because of duplicate username', () => {
            return request(app)
            .post('/api/authentication/register')
            .set('Accept', 'application/json')
            .send('name=name')
            .send('password=password')
            .expect(400)
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
        beforeAll(async () => { await userModel.create({ name: 'name', password: 'password' }) })
        afterAll(async () => { await UserModel.deleteMany({ name: 'name' }) })

        it('returns 200 because req.body is valid', () => {
            return request(app)
            .post('/api/authentication/login')
            .set('Accept', 'application/json')
            .send('name=name')
            .send('password=password')
            .expect(200)
        })
        
        it('returns 401 because name is invalid', () => {
            return request(app)
            .post('/api/authentication/login')
            .set('Accept', 'application/json')
            .send('name=nonexistantname')
            .send('password=password')
            .expect(401)
        })

        it('returns 401 because password is invalid', () => {
            return request(app)
            .post('/api/authentication/login')
            .set('Accept', 'application/json')
            .send('name=name')
            .send('password=wrongpassword')
            .expect(401)
        })
    })
})

