const supertest = require('supertest')

const makeServer = require('../server')
const router = require('../router')
const session = require('../config/session')

// TODO: mock session & passport.authenticate
const User = require('../features/user/User')

jest
    .spyOn(User, 'findOne')
    .mockImplementation(({ username }) => {
        return new Promise((resolve, reject) => {
            if (username === 'existingUser') {
                return resolve({
                    username: 'existingUser'
                })
            }
            return resolve(null)
        })
    })

jest
    .spyOn(User, 'register')
    .mockReturnValue(
        Promise.resolve()
    )

const app = makeServer(session, router, null)


describe('GET /auth/register', () => {
    test('should respond with a statusCode 200', async () => {
        await supertest(app)
            .get('/auth/register')
            .expect(200)
            .expect('Content-Type', /html/)
    })
})


describe('POST /auth/register', () => {
    test('should respond with a statusCode 201 and create a user', async () => {
        await supertest(app)
            .post('/auth/register')
            .send({
                username: 'newUser',
                password: 'newUserPassword'
            })
            .expect(201)
            .expect('Location', '/auth/login')
    })

    test('should respond with a statusCode 401 if credentials was not provided', async () => {
        await supertest(app)
            .post('/auth/register')
            .send({})
            .expect(401)
            .expect('Content-Type', /json/)
    })

    test('should respond with a statusCode 401 if the username was not provided', async () => {
        await supertest(app)
            .post('/auth/register')
            .send({ password: 'password' })
            .expect(401)
            .expect('Content-Type', /json/)
    })

    test('should respond with a statusCode 401 if the password was not provided', async () => {
        await supertest(app)
            .post('/auth/register')
            .send({ username: 'user' })
            .expect(401)
            .expect('Content-Type', /json/)
    })

    test('should respond with a statusCode 409 if user already exists', async () => {
        await supertest(app)
            .post('/auth/register')
            .send({
                username: 'existingUser',
                password: 'existingUserPassword'
            })
            .expect(409)
            .expect('Location', '/auth/register')
    })
})
