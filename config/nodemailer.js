const nodemailer = require('nodemailer')

const { NODEMAILER_PASS, NODEMAILER_USER } = require('./env')

const nodemailerTransporter = nodemailer.createTransport({
    service: 'Yandex',
    auth: {
        user: NODEMAILER_USER,
        pass: NODEMAILER_PASS
    }
})

module.exports = nodemailerTransporter




