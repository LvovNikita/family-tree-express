'use strict'

const User = require('../user/User')


exports.getRegisterPage = async (req, res, next) => {
    try {
        return res
            .status(200)
            .render('register', {
                title: 'Register',
                formActionSlug: '/auth/register'
            })
    } catch (err) {
        next(err)
    }
}


exports.postRegisterCredentials = async (req, res, next) => {
    const { username, password } = req.body

    if (!username && !password) {
        return res
            .status(400)
            .json({ error: 'Please provide username and password' }) // TODO: flash error instead
    }

    if (!username) {
        return res
            .status(400)
            .json({ error: 'Please provide username' }) // TODO: flash error instead
    }

    if (!password) {
        return res
            .status(400)
            .json({ error: 'Please provide password' }) // TODO: flash error instead
    }

    const existingUser = await User.findOne({ username })

    if (existingUser) {
        console.log(existingUser)
        return res
            .status(409)
            .json({ error: 'User already exists' }) // TODO: flash error instead
    }

    try {
        User.register(username, password)
    } catch (err) {
        return next(err)
    }

    return res
        .status(302)
        .redirect('/auth/login')
}


exports.getLoginPage = async (req, res, next) => {
    res
        .status(200)
        .render('login', {
            title: 'Login',
            formActionSlug: '/auth/login'
        })
}


exports.postLoginCredentials = async (req, res, next) => {
    // processed by passportjs
    next()
}

exports.logout = async (req, res, next) => {
    // passportjs method = clear req.user and destroy session
    req.logout(err => {
        if (err) throw new Error() // FIXME: handle error !!!
        res
            .status(200)
            .redirect('/auth/login')
    })
}
