const request = require('supertest');
const app = require('../app');

describe('media', () => {
    describe('POST /api/media/search',  () => {
        it('returns 200 because query is valid', () => {
            return request(app)
            .get('/api/media/search')
            .query({ phrase: 'test' })
            .expect(200)
            .then(res => {
                res._body.forEach(media => {
                    expect(media).toHaveProperty('title')
                    expect(media).toHaveProperty('id')
                    expect(media).toHaveProperty('mediaType')
                })
            })
        })
    });

    describe('POST /api/media/trending',  () => {
    })

    describe('POST /api/media/:type/:id',  () => {
    })
})

