const USER_ACCOUNT = {
  uid: null,
  activated: false,
  terms: false,
  billing: {
    paymentMethods: {
      creditCards: {}
    },
    invoices: {
      'invoiceId1': true
    }
  },
  address: {
    line1: '',
    line2: '',
    city: '',
    state: '',
    zip: ''
  },
  products: {
    'productId1': true
  },
}

module.exports = USER_ACCOUNT