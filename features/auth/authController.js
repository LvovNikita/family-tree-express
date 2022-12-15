'use strict'

const User = require('../user/User')
const { ValidationError } = require('../../utils/errors')

exports.getRegisterPage = async (req, res, next) => {
    try {
        return res
            .status(200)
            .render('register', {
                title: 'Register',
                formActionSlug: '/auth/register',
                showFields: {
                    username: true,
                    email: true,
                    password: true
                }
            })
    } catch (err) {
        return next(err)
    }
}


exports.postRegisterCredentials = async (req, res, next) => {
    const { username, password, email } = req.body

    if (!username) {
        return res
            .status(401)
            .json({ error: 'Please provide username' })
    }

    if (!email) {
        return res
            .status(401)
            .json({ error: 'Please provide email' })
    }

    if (!password) {
        return res
            .status(401)
            .json({ error: 'Please provide password' })
    }

    try {
        const existingUser = await User.findOne({
            $or: [{ username }, { email }]
        })

        if (existingUser) {
            if (existingUser.username === username) {
                req.flash(
                    'error',
                    'Username already exists. Please try again'
                )
            } else if (existingUser.email === email) {
                req.flash(
                    'error',
                    'Email already exists. Please try again'
                )
            }
            return res
                .type('html')
                .redirect('/auth/register')
        } else {
            await User
                .register(username, password, email)
            return res
                .redirect('/auth/login')
        }
    } catch (err) {
        if (err instanceof ValidationError) {
            return res
                .status(401)
                .json({ error: err.message })
        } else {
            return next(err)
        }
    }
}


exports.getLoginPage = async (req, res, next) => {
    try {
        return res
            .status(200)
            .render('login', {
                title: 'Login',
                formActionSlug: '/auth/login',
                showFields: {
                    username: true,
                    password: true
                }
            })
    } catch (err) {
        return next(err)
    }
}

// check authRouter for passportjs implementation details
exports.postLoginCredentials = async (err, req, res, next) => {
    if (err.status === 401) {
        req.flash('error', 'Wrong username or password. Try again or click <a href="/auth/passwordReset">Reset Password</a>')
        return res
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

// TODO:
exports.getPasswordResetPage = async (req, res, next) => {
    try {
        return res
            .status(200)
            .render('passwordReset', {
                title: 'Reset Password',
                formActionSlug: '/auth/passwordReset',
                showFields: {
                    email: true
                }
            })
    } catch (err) {
        next(err)
    }
}

// exports.postPasswordResetCredentials = async (req, res, next) => {}
