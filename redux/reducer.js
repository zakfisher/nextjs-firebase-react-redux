import ACTIONS from './actions'

export default (state, action) => {
  switch (action.type) {

    case ACTIONS.CLEAR_STATE:
      return {}

    case ACTIONS.SET_CLAIMS:
      return {...state, claims: action.claims}

    case ACTIONS.SET_PRODUCTS:
      return {...state, products: action.products}

    case ACTIONS.SET_USER:
      return {...state, user: action.user}

    case ACTIONS.SET_USERS:
      return {...state, users: action.users}

    default: return state
  }
}
