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
        return next(err)
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

    try {
        const existingUser = await User.findOne({ username })

        if (existingUser) {
            console.log(existingUser)
            return res
                .status(409)
                .json({ error: 'User already exists' }) // TODO: flash error instead
        }

        await User.register(username, password)

        return res
            .status(201)
            .redirect('/auth/login')
    } catch (err) {
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
