import { methods, POUCH_DB, FEED_CHANGE, pouchify } from 'redux-pouch'
import { db, name as dbName } from './db'
import { createAction } from 'redux-actions'
import superagent, { server } from '../agent'
import imu from 'immutable'

export const ADD = 'projects/ADD'
export const add = createAction(ADD, async (project) => {
  const np = await superagent
    .post('/projects')
    .use(server)
    .send(project)
    .end()
  return np.headers.location
}, (values) => (values))

export const FETCH_ALL = 'projects/FETCH_ALL'
export const fetchAll = createAction(FETCH_ALL, async () => {
  const projects = await superagent
    .get('/projects')
    .use(server)
    .end()
  return projects.body
})

export const CLEAR = 'projects/CLEAR'
export const clear = createAction(CLEAR, () => ({
  [POUCH_DB]: {
    method: methods.deleteAll,
    db
  }
}))

export const actions = {
  add,
  fetchAll,
  clear
}

const NEXT = 'next'
const START = 'start'

export function projectsReducer (state = { all: [] }, action) {
  switch (action.type) {
    case ADD:
      switch (action.sequence.type) {
        case START:
          return imu.fromJS(state).setIn(['newProject'], {
            ...action.meta,
            seqId: action.sequence.id,
            isSyncing: true
          }).toJS()
        case NEXT:
          return imu.fromJS(state).updateIn(['newProject', 'isSyncing'], (value) => false).toJS()
      }
      break

    case CLEAR:
      return action.sequence.type === NEXT && !action.error ? [] : state

    case FETCH_ALL:
      switch (action.sequence.type) {
        case START:
          return state
        case NEXT:
          return { all: action.payload }
      }
      break

      // TODO @sven? :)
    case FEED_CHANGE:
      const changeBox = action.payload.change.doc
        // TODO name comparison is a bit like cheating here but it illustrates the point
        // This has to be worked out in more depth anyway
      const rest = state.filter(project => project.name !== changeBox.name)
      const nextProject = state.find(project => project.name === changeBox.name)

      if (changeBox._deleted) {
        return rest
      } else {
        return typeof nextProject === 'undefined'
          ? [...state, changeBox]
          : (typeof nextProject.seqId === 'undefined'
              ? [...rest, changeBox] : state)
      }
      break

    default:
      return state
  }
}

export default pouchify(projectsReducer, dbName)
