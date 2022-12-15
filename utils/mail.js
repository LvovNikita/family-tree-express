const nodemailerTransporter = require('../config/nodemailer')

const { NODEMAILER_USER } = require('../config/env')

function sendMail (to, subject, html) {
    nodemailerTransporter.sendMail({
        from: `FamilyTree <${NODEMAILER_USER}>`,
        to,
        subject,
        html
    })
}

module.exports = {
    sendMail
}
