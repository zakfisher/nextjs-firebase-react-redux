import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import REDUCER from './reducer'

export const initStore = (state = {}) => {
  let middleware = applyMiddleware(thunkMiddleware)
  const dev = process.env.NODE_ENV !== 'production'
  if (dev) middleware = composeWithDevTools(middleware)
  return createStore(REDUCER, state, middleware)
}
