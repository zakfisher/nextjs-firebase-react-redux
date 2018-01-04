import ACTIONS from './actions'

const ACTION_CREATORS = {}

ACTION_CREATORS.clearState = () => dispatch => {
  return dispatch({
    type: ACTIONS.CLEAR_STATE
  })
}

ACTION_CREATORS.setClaims = claims => dispatch => {
  return dispatch({
    type: ACTIONS.SET_CLAIMS,
    claims
  })
}

ACTION_CREATORS.setProducts = products => dispatch => {
  return dispatch({
    type: ACTIONS.SET_PRODUCTS,
    products
  })
}

ACTION_CREATORS.setUser = user => dispatch => {
  return dispatch({
    type: ACTIONS.SET_USER,
    user
  })
}

ACTION_CREATORS.setUsers = users => dispatch => {
  return dispatch({
    type: ACTIONS.SET_USERS,
    users
  })
}

export default ACTION_CREATORS