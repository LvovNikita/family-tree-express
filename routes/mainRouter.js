'use strict'

const { Router } = require('express')

const User = require('../models/User')

const mainController = require('../controllers/mainController')
const wrapper = require('./wrapper.js')

const mainRouter = new Router()

mainRouter.get('/', wrapper(mainController.getIndexPage))
mainRouter.get('/profile', async (req, res, next) => {
    const user = await User.findOne({}).populate('trees') // FIXME: get current user from session
    if (user) {
        return res.render('profile', {
            title: 'Profile',
            user
        })
    }
    return res.redirect('/auth/login')
})

module.exports = mainRouter
