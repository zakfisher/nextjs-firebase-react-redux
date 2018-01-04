const ACTIONS = [
  'CLEAR_STATE',
  'SET_CLAIMS',
  'SET_PRODUCTS',
  'SET_USER',
  'SET_USERS',
]

export default ACTIONS.reduce((obj, action) => {
  obj[action] = action
  return obj
}, {})