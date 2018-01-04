const PRODUCT = {
  productId: null,
  brandId: null,
  name: '',
  description: '',
  image: '',
  hosting: {
    price: 10,
    stagingUrl: '',
    productionUrl: ''
  },
  features: {
    'productFeatureId1': true,
    'productFeatureId2': true,
  },
  users: {
    'uid1': { owner: true },
    'uid2': {
      'featureId2': true
    },
  }
}

module.exports = PRODUCT