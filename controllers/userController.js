'use strict'

const User = require('../models/User')

const userController = {
    getProfilePage: async (req, res, next) => {
        const user = await User.findOne({}).populate('trees') // FIXME: get current user from session
        if (user) {
            return res.render('profile', {
                title: 'Profile',
                user
            })
        }
        return res.redirect('/auth/login')
    }
}

module.exports = userController
