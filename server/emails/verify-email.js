const sgMail = require('../helpers/sendgrid')

module.exports = function sendVerificationEmail({ isDev, email, token }) {
  const domain = isDev ? 'http:\/\/localhost:3000' : 'https:\/\/product-admin.herokuapp.com'
  sgMail.sendMultiple({
    to: [email, 'zak.fisher@gmail.com'],
    from: 'verify@email.com',
    subject: 'Verify Email',
    text: ' ',
    html: ' ',
    templateId: 'f056155c-4ba4-4aee-b9f2-64ef03538013',
    substitutions: {
      email,
      company_name: 'Product Admin',
      verification_link: `${domain}/verify-email?token=${token}`
    }
  }).then(res => {
    console.log('Verification email sent to', email)
  }).catch(err => {
    console.log('error', err.response.body.errors[0].message)
  })
}
