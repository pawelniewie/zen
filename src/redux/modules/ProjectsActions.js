import { methods, POUCH_DB, FEED_CHANGE, pouchify } from 'redux-pouch'
import { db, name as dbName } from './db'
import { createAction } from 'redux-actions'
import { routeActions } from 'redux-simple-router'

export const ADD = 'projects/ADD'
export const add = createAction(ADD, () => ({
  [POUCH_DB]: {
    method: methods.create,
    db
  }
}), (values) => (values))

export const FETCH_ALL = 'projects/FETCH_ALL'
export const fetchAll = createAction(FETCH_ALL, () => ({
  [POUCH_DB]: {
    method: methods.findAll,
    db
  }
}))

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

export function projectsReducer(state = [], action) {
  switch (action.type) {
    case ADD:
      switch (action.sequence.type) {
        case START:
          return [...state, {
            ...action.meta,
              seqId: action.sequence.id,
              isSyncing: true
          }]
        case NEXT:
          // TODO sorting
          const rest = state.filter(project => project.seqId !== action.sequence.id)
          let nextProject = {
            ...state.find(project => project.seqId === action.sequence.id),
              isSyncing: false
          }

          if (action.error) {
            nextProject.error = action.payload
          } else {
            nextProject = {
              ...nextProject,
              ...action.payload
            }
          }

          return [...rest, nextProject]
      }

    case CLEAR:
      return action.sequence.type === NEXT && !action.error ? [] : state

    case FETCH_ALL:
      switch (action.sequence.type) {
        case START:
          return state
        case NEXT:
          return action.payload
      }

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
        return typeof nextProject === 'undefined' ?
          [...state, changeBox] :
          (typeof nextProject.seqId === 'undefined' ?
            [...rest, changeBox] :
            state)
      }

    default:
      return state
  }
}

export default pouchify(projectsReducer, dbName)
