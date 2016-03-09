import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from './modules/counter'
import projectsReducer from './modules/ProjectsActions'
import issuesReducer from './modules/IssuesActions'

export default combineReducers({
  counter,
  router,
  projects: projectsReducer,
  issues: issuesReducer
})
