const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || require('../keys/sendgrid-api-key.json')
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);
sgMail.setSubstitutionWrappers('{{', '}}');
module.exports = sgMail
