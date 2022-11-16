'use strict'

// const User = require('./User')

const userController = {
    getProfilePage: async (req, res, next) => {
        if (req.isAuthenticated()) {
            // const user = await User
            //     .findOne({ _id: req.session.user._id })
            //     .populate('trees') // FIXME: get current user from session
            // if (user) {
            return res
                .status(200)
                .render('profile', {
                    title: 'Profile',
                    user: { trees: [] } // FIXME: real user data!
                })
            // }
        }
        return res
            .status(401)
            .json({ error: 'Unauthorized' })
            // .redirect('/auth/login')
    }
}

module.exports = userController
