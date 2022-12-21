const supertest = require('supertest')

const session = require('express-session')

const makeServer = require('../server')
const router = require('../router')
const User = require('../features/user/User')

// TODO: passport, flash, ejsLayouts

// mocks

const sessionConfig = session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
})

const res = {
    status: jest.fn(),
    render: jest.fn()
}

jest
    .spyOn(User, 'findOne')
    .mockImplementation(({ $or }) => {
        return new Promise((resolve, reject) => {
            if ($or[0].username === 'existingUser' || $or[1].email === 'existingUser@test.com') {
                return resolve({
                    username: 'existingUser',
                    email: 'existingUser@test.com'
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

// tests

const app = makeServer(sessionConfig, router, 'ejs', 'null', 'testing')


describe('GET /auth/register', () => {
    const { getRegisterPage } = require('../features/auth/authController')

    test('should respond call render function', async () => {
        const req = { path: '/auth/register', method: 'GET' }
        getRegisterPage(req, res, () => {})
        expect(res.render).toHaveBeenCalledTimes(1)
        expect(res.render.mock.calls[0][0]).toBe('register')
    })
})


describe('POST /auth/register', () => {
    test('should create the user and redirect to /auth/login', async () => {
        await supertest(app)
            .post('/auth/register')
            .send({
                username: 'newUser',
                email: 'newUser@test.com',
                password: 'newUserPassword'
            })
            .expect(302)
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
            .send({ password: 'password', email: 'email@test.com' })
            .expect(401)
            .expect('Content-Type', /json/)
    })

    test('should respond with a statusCode 401 if the password was not provided', async () => {
        await supertest(app)
            .post('/auth/register')
            .send({ username: 'user', email: 'email@test.com' })
            .expect(401)
            .expect('Content-Type', /json/)
    })

    test('should respond with a statusCode 401 if the email was not provided', async () => {
        await supertest(app)
            .post('/auth/register')
            .send({ username: 'user', password: 'password' })
            .expect(401)
            .expect('Content-Type', /json/)
    })

    test('should redirect to /auth/register if username already exists', async () => {
        await supertest(app)
            .post('/auth/register')
            .send({
                username: 'existingUser',
                email: 'newUser@test.com',
                password: 'existingUserPassword'
            })
            .expect(302)
            .expect('Location', '/auth/register')
    })

    test('should redirect to /auth/register if email already exists', async () => {
        await supertest(app)
            .post('/auth/register')
            .send({
                username: 'newUser',
                email: 'existingUser@test.com',
                password: 'existingUserPassword'
            })
            .expect(302)
            .expect('Location', '/auth/register')
    })
})
