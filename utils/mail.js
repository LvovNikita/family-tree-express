const nodemailerTransporter = require('../config/nodemailer')

const { NODEMAILER_USER } = require('../config/env')

function sendMail (to, subject, text) {
    nodemailerTransporter.sendMail({
        from: NODEMAILER_USER,
        to,
        subject,
        text
    })
}

module.exports = {
    sendMail
}
