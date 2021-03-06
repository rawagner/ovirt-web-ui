import Immutable from 'immutable'
import { REDIRECT } from '../constants'
import { actionReducer } from './utils'

/**
 * The Route reducer
 *
 * @param state
 * @param action
 * @returns {*}
 */
const route = actionReducer(Immutable.fromJS({
  redirect: undefined, // undefined, '/', '/vm/00-0000-00000-000' and etc.
}), {
  [REDIRECT] (state, action) {
    return state
      .set('redirect', action.payload.route)
  },
})

export default route
