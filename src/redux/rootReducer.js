import { combineReducers } from 'redux'
import { routeReducer as router } from 'redux-simple-router'
import counter from './modules/counter'
import projectsReducer from './modules/ProjectsActions'

export default combineReducers({
  counter,
  router,
  projectsReducer
})
