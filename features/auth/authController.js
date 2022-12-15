'use strict'

const crypto = require('node:crypto')
const { promisify } = require('node:util')
const randomBytes = promisify(crypto.randomBytes)

const User = require('../user/User')
const { generatePassword } = require('../../utils/password')
const { ValidationError } = require('../../utils/errors')
const { sendMail } = require('../../utils/mail')

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


exports.postPasswordResetCredentials = async (req, res, next) => {
    try {
        const email = req.body.email
        const user = await User.findOne({ email })
        if (user) {
            const buffer = await randomBytes(32)
            const token = buffer.toString('hex')
            user.passwordResetToken = token
            user.passwordResetTokenExpiration = Date.now() + 1000 * 60 * 60
            await user.save()
            await sendMail(
                email,
                'Reset Password',
                `Click to reset password: http://localhost:3000/auth/newPassword/${token}. Link is valid for 1 hour`
            )
            return res.json({
                message: 'Password was sent to',
                email
            })
        } else {
            req.flash(
                'error',
                'Wrong email address'
            )
            res
                .redirect('/auth/passwordReset')
        }
    } catch (err) {
        return next(err)
    }
}


exports.getNewPasswordPage = async (req, res, next) => {
    try {
        return res.render('passwordReset', {
            title: 'Set New Password',
            formActionSlug: `/auth/newPassword/${req.params.token}`,
            showFields: {
                password: true
            }
        })
    } catch (err) {
        next(err)
    }
}

exports.postNewPassword = async (req, res, next) => {
    try {
        const token = req.params.token
        const user = await User.findOne({
            passwordResetToken: token,
            passwordResetTokenExpiration: { $gt: Date.now() }
        })
        if (user) {
            // FIXME: extract to User.updatePassword()
            const password = req.body.password
            if (password.length < 8) {
                throw new ValidationError('Password must be at least 8 characters long')
            }
            const { hash, salt } = await generatePassword(password)
            user.passwordHash = hash
            user.salt = salt
            await user.save()
            return res
                .redirect('/auth/login')
        } else {
            req.flash(
                'error',
                'Invalid or expired token. Try reset password again '
            )
            return res
                .redirect('/auth/passwordReset')
        }
    } catch (err) {
        next(err)
    }
}
