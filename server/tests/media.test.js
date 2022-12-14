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

        it('returns 400 because page number is invalid', () => {
            return request(app)
            .get('/api/media/search')
            .query({ phrase: 'test' })
            .query({ page: -1 })
            .expect(400)
        })

        it('returns 400 because search phrase is invalid', () => {
            return request(app)
            .get('/api/media/search')
            .query({ phrase: '' })
            .query({ page: 0 })
            .expect(400)
        })
    });

    describe('POST /api/media/trending',  () => {
        it('returns 200', () => {
            return request(app)
            .get('/api/media/trending')
            .expect(200)
            .then(res => {
                expect(res._body).toHaveProperty('tv')
                expect(res._body).toHaveProperty('movies')
            })
        })
    })

    describe('POST /api/media/:type/:id',  () => {
        it('returns 200 because request is valid', () => {
            return request(app)
            .get('/api/media/movie/2')
            .expect(200)
            .then(res => {
                expect(res._body).toHaveProperty('title')
                expect(res._body).toHaveProperty('genres')
                expect(res._body).toHaveProperty('overview')
            })
        })

        it('returns 404 because resource does not exist', () => {
            return request(app)
            .get('/api/media/movie/1000000000000000000')
            .expect(404)
        })
        
        it('returns 400 because media type is invalid', () => {
            return request(app)
            .get('/api/media/invalidMediaType/1000000000000000000')
            .expect(400)
        })

        it('returns 400 because id is invalid', () => {
            return request(app)
            .get('/api/media/movie/invalidNum')
            .expect(400)
        })

        it('returns 400 because id is invalid', () => {
            return request(app)
            .get('/api/media/movie/-1')
            .expect(400)
        })
    })
})

