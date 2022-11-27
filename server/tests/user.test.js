const UserModel = require('../models/user-model')
const request = require('supertest');
const app = require('../app');

describe('user tests', () => {
    let token;
    
    beforeAll(async () => {
        const user = await UserModel.create({ name: 'test', password: 'password' })
        token = user.createJWT()
    })

    afterAll(async () => {
        const user = await UserModel.deleteMany({ name: 'test' })
    })

    describe('GET /api/user',  () => {
        it('returns 400 because id is invalid', () => {
            return request(app)
            .get('/api/user/fake_id')
            .expect(400)
        })

        it('returns 404 because user is nonexistant', () => {
            return request(app)
            .get('/api/user/eeeeeeeeeeeeeeeeeeeeeeee')
            .expect(404)
        })
    });

    describe('PATCH /api/user',  () => {
        it('returns 200 because request is valid', () => {
            return request(app)
            .patch('/api/user/')
            .set('Cookie', [`token=${token}`,])
            .send('currentPassword=password')
            .send('newName=newName')
            .send('newPassword=newPassword')
            .expect(200)
        })
    })
})

