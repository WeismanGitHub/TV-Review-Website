const request = require('supertest');
const app = require('../app');

describe('media', () => {
    describe('GET /api/invalid/path',  () => {
        it('returns 404 because path is nonexistant', () => {
            return request(app)
            .get('/api/invalid/path')
            .expect(404)
        })
    });
})

