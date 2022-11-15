'use strict'

const User = require('../user/User')
const { generatePassword } = require('../../utils/password')


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
            .status(422)
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
        const { hash, salt } = await generatePassword(password)
        const newUser = new User({ username, password: hash, salt })
        await newUser.save()
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
    // if (!req.body.username || !req.body.password) {
    //     return res
    //         .status(422)
    //         .json({ error: 'Please provide username and password' })
    // }
    // const { username, password } = req.body
    // const authResult = await User.login(username, password)
    // if (authResult.err) { // TODO: use next instead?
    //     return res
    //         .status(500)
    //         .json({ error: authResult.err })
    // }
    // if (!authResult.user) {
    //     return res
    //         .status(401)
    //         .json({ error: 'This user doesn\'t exists' })
    // }
    // req.session.user = { _id: authResult.user.id }
    // return res
    //     .status(302)
    //     .redirect('/user/profile') // TODO: redirect to user profile
}

exports.logout = async (req, res, next) => {
    // req.session.destroy()
    // res
    //     .status(200)
    //     .redirect('/auth/login')
}
