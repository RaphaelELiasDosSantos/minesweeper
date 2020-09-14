import nodemailer from 'nodemailer'
import config from '../../configs'
async function sendEmail (subject, destinatary, message) {
  let transporter = nodemailer.createTransport({
    port: 587,
    host: config.nodemailer.region,
    secure: false,
    auth: {
      user: config.nodemailer.access_key,
      pass: config.nodemailer.secret
    },
    debug: true
  })
  await transporter.sendMail({
    from: config.nodemailer.from,
    to: destinatary,
    subject: subject,
    html: message
  })
}
module.exports = {
  sendEmail
}
