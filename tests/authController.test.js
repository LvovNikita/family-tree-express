const supertest = require('supertest')

const makeServer = require('../server')
const router = require('../router')
const session = require('../config/session')

const app = makeServer(session, router, null)

describe('GET /auth/register', () => {
    test('should respond with a statusCode 200', async () => {
        await supertest(app)
            .get('/auth/register')
            .expect(200)
    })

    test('should respond with Content-Type html', async () => {
        await supertest(app)
            .get('/auth/register')
            .expect('Content-Type', /html/)
    })
})
