import PouchDB from 'pouchdb'

export const name = 'boxes'
export const db = new PouchDB(name)
export default db
