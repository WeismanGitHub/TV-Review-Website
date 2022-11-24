const request = require('supertest');
const app = require('../app');

describe('user tests', () => {
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
})
