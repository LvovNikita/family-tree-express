'use strict'

const User = require('./User')
require('../tree/Tree') // FIXME: just for testing purposes

const userController = {
    getProfilePage: async (req, res, next) => {
        if (req.isAuthenticated()) {
            try {
                const currentUserId = req.session.passport.user

                const user = await User
                    // FIXME: make method
                    .findById(currentUserId)
                    .select({
                        passwordHash: 0,
                        salt: 0
                    })
                    .populate('trees')
                    .populate('persons')

                return res
                    .status(200)
                    .render('profile', {
                        title: 'Profile',
                        user
                    })
            } catch (err) {
                next(err)
            }
        }

        return res
            .status(401)
            .json({ error: 'Unauthorized' }) // FIXME: flash error
    }
}

module.exports = userController
