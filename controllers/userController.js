'use strict'

const User = require('../models/User')

const userController = {
    getProfilePage: async (req, res, next) => {
        if (req.session.user) {
            const user = await User
                .findOne({ _id: req.session.user._id })
                .populate('trees') // FIXME: get current user from session
            if (user) {
                return res.render('profile', {
                    title: 'Profile',
                    user
                })
            }
        }
        return res.redirect('/auth/login')
    }
}

module.exports = userController
