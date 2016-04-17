import { createAction } from 'redux-actions'
import superagent, { server } from '../agent'
import update from 'react/lib/update'

export const SELECT_PROJECT = 'issues/SELECT_PROJECT'
export const selectProject = createAction(SELECT_PROJECT)

export const ADD = 'issues/ADD'
export const add = createAction(ADD, async issue => {
  const resp = await superagent
    .post('/issues')
    .use(server)
    .set('Prefer', 'return=representation')
    .send(issue)
    .end()
  return resp.body
}, (values) => (values))

export const FETCH_BY_PROJECT = 'issues/FETCH_BY_PROJECT'
export const fetchByProject = createAction(FETCH_BY_PROJECT, async id => {
  const resp = await superagent
    .get('/issues')
    .query({'project_id': 'eq.' + id})
    .use(server)
    .end()
  return resp.body
}, (values) => (values))

export const FETCH_BY_LOCATION = 'issues/FETCH_BY_LOCATION'
export const fetchByLocation = createAction(FETCH_BY_LOCATION, async location => {
  const resp = await superagent
    .get(location)
    .use(server)
    .end()
  return resp.body
}, (values) => (values))

export const FETCH_BY_KEY = 'issues/FETCH_BY_KEY'
export const fetchByKey = createAction(FETCH_BY_KEY, async key => {
  const resp = await superagent
    .get('/issues')
    .query({'project_id': 'eq.' + key})
    .use(server)
    .end()
  return resp.body
}, (values) => (values))

export const FETCH_ALL = 'issues/FETCH_ALL'
export const fetchAll = createAction(FETCH_ALL, async () => {
  const projects = await superagent
    .get('/issues')
    .use(server)
    .end()
  return projects.body
})

export const actions = {
  add,
  fetchAll,
  fetchByProject,
  fetchByKey,
  fetchByLocation,
  selectProject
}

const NEXT = 'next'
const START = 'start'

export function issuesReducer (state = { open: [] }, action) {
  switch (action.type) {
    case ADD:
      switch (action.sequence.type) {
        case START:
          return {...state, newIssue: {
            ...action.meta,
            seqId: action.sequence.id,
            isSyncing: true
          }}
        case NEXT:
          return update(state, {newIssue: {isSyncing: {$set: false}}})
      }
      break

    case SELECT_PROJECT:
      return {...state, createIssue: {projectId: action.payload.projectId}}

    case FETCH_BY_PROJECT:
    case FETCH_BY_LOCATION:
      switch (action.sequence.type) {
        case START:
          return update(state, {fetchingOpen: {$set: true}})
        case NEXT:
          return update(state, {open: { $set: action.payload }, fetchingOpen: {$set: false}})
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

export default issuesReducer
