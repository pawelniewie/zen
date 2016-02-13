import superagent from 'superagent'
import superpromise from 'superagent-promise'
import superprefix from 'superagent-prefix'
import { Promise } from 'es6-promise'

const agent = superpromise(superagent, Promise)

export default agent

export const server = superprefix(__PROD__ ? 'http://database.usezen.it:3001' : 'http://localhost:3001')
