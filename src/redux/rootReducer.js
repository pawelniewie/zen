import { combineReducers } from 'redux'
import { routeReducer as router } from 'react-router-redux'
import counter from './modules/counter'
import projectsReducer from './modules/ProjectsActions'

export default combineReducers({
  counter,
  router,
  projects: projectsReducer
})
