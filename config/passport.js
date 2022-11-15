const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../features/user/User')

const verifyCb = async (username, password, done) => {
    try {
        const user = await User.findOne({ username })
        if (!user) return done(null, false)
        const isPasswordValid = User.validatePassword(password)
        if (isPasswordValid) return done(null, user)
        return done(null, false)
    } catch (err) {
        return done(err)
    }
}

passport.use(new LocalStrategy(verifyCb))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id)
        done(null, user)
    } catch (err) {
        done(err)
    }
})
