const INVOICE = {
  invoiceId: null,
  month: 0,
  year: 0,
  total: 15,
  products: {
    'setup': {
      design: 2500,
      development: 2500,
    },
    'productId2': {
      hosting: 10,
      features: {
        'productFeatureId1': 0,
        'productFeatureId2': 5,
      }
    }
  }
}

module.exports = INVOICE