'use strict'

const User = require('../user/User')
const { ValidationError } = require('../../utils/errors')

exports.getRegisterPage = async (req, res, next) => {
    try {
        return res
            .status(200)
            .render('register', {
                title: 'Register',
                formActionSlug: '/auth/register'
            })
    } catch (err) {
        return next(err)
    }
}


exports.postRegisterCredentials = async (req, res, next) => {
    const { username, password } = req.body

    if (!username && !password) {
        return res
            .status(401)
            .json({ error: 'Please provide username and password' })
    }

    if (!username) {
        return res
            .status(401)
            .json({ error: 'Please provide username' })
    }

    if (!password) {
        return res
            .status(401)
            .json({ error: 'Please provide password' })
    }

    try {
        const existingUser = await User.findOne({ username })

        if (existingUser) {
            req.flash('error', 'Username already exists. Please try again')
            return res
                .type('html')
                .redirect(409, '/auth/register')
        }

        await User.register(username, password)

        return res
            .redirect(201, '/auth/login')
    } catch (err) {
        if (err instanceof ValidationError) {
            return res
                .status(401)
                .json({ error: err.message })
        }
        return next(err)
    }
}


exports.getLoginPage = async (req, res, next) => {
    try {
        res
            .status(200)
            .render('login', {
                title: 'Login',
                formActionSlug: '/auth/login'
            })
    } catch (err) {
        return next(err)
    }
}

// check authRouter for passportjs implementation details
exports.postLoginCredentials = async (err, req, res, next) => {
    if (err.status === 401) {
        return res
            .status(401)
            .redirect('/auth/login') // FIXME: flash message instead
    }
    return next(err)
}


exports.logout = async (req, res, next) => {
    // passportjs method req.logout() = clear req.user and destroy session
    req.logout(err => {
        if (err) {
            return next(err)
        }
        return res
            .status(200)
            .redirect('/')
    })
}
