const supertest = require('supertest')

const makeServer = require('../server')
const router = require('../router')
const session = require('../config/session')

// TODO: mock session & passport.authenticate
// TODO: mock database or User model

// jest.mock('../config/session', () => {
//     return (req, res, next) => { next() }
// })

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


describe('POST /auth/register', () => {
    test('should respond with a statusCode 400 if credentials was not provided', async () => {
        await supertest(app)
            .post('/auth/register')
            .send({})
            .expect(401)
            .expect('Content-Type', /json/) // FIXME:
    })

    test('should respond with a statusCode 400 if the username was not provided', async () => {
        await supertest(app)
            .post('/auth/register')
            .send({ password: 'password' })
            .expect(401)
            .expect('Content-Type', /json/) // FIXME:
    })

    test('should respond with a statusCode 400 if the password was not provided', async () => {
        await supertest(app)
            .post('/auth/register')
            .send({ username: 'user' })
            .expect(401)
            .expect('Content-Type', /json/) // FIXME:
    })
})
