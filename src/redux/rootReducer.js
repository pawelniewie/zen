import { combineReducers } from 'redux'
import { routeReducer as router } from 'redux-simple-router'
import counter from './modules/counter'
import boxes from './modules/boxes'

export default combineReducers({
  counter,
  router,
  boxes
})
