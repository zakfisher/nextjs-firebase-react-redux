const STRIPE_API_KEY = process.env.STRIPE_API_KEY || require('../keys/stripe-api-key.json')
const stripe = require('stripe')(STRIPE_API_KEY)



module.exports = stripe