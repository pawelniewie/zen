import { createAction } from 'redux-actions'
import superagent, { server } from '../agent'
import update from 'react/lib/update'

export const ADD = 'projects/ADD'
export const add = createAction(ADD, async (project) => {
  const np = await superagent
    .post('/projects')
    .use(server)
    .send(project)
    .end()
  return np.headers.location
}, (values) => (values))

export const FETCH_BY_KEY = 'projects/FETCH_BY_KEY'
export const fetchByKey = createAction(FETCH_BY_KEY, async (key) => {
  const resp = await superagent
    .get('/projects')
    .query({'key': 'eq.' + key})
    .use(server)
    .set('Prefer', 'plurality=singular')
    .end()
  return resp.body
}, (values) => (values))

export const FETCH_ALL = 'projects/FETCH_ALL'
export const fetchAll = createAction(FETCH_ALL, async () => {
  const projects = await superagent
    .get('/projects')
    .use(server)
    .end()
  return projects.body
})

export const actions = {
  add,
  fetchAll,
  fetchByKey
}

const NEXT = 'next'
const START = 'start'

export function projectsReducer (state = { all: [], fetchingAll: false }, action) {
  switch (action.type) {
    case ADD:
      switch (action.sequence.type) {
        case START:
          return {...state, newProject: {
            ...action.meta,
            seqId: action.sequence.id,
            isSyncing: true
          }}
        case NEXT:
          return update(state, {newProject: {isSyncing: {$set: false}}})
      }
      break

    case FETCH_BY_KEY:
      switch (action.sequence.type) {
        case START:
          return {...state, currentProject: {
            isSyncing: true
          }}
        case NEXT:
          return update(state, {currentProject: {$merge: {...action.payload, isSyncing: false}}})
      }
      break

    case FETCH_ALL:
      switch (action.sequence.type) {
        case START:
          return update(state, {fetchingAll: {$set: true}})
        case NEXT:
          return update(state, {all: { $set: action.payload }, fetchingAll: {$set: false}})
      }
      break

    default:
      return state
  }
}

export default projectsReducer
