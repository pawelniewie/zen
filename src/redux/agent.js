import superagent from 'superagent'
import superpromise from 'superagent-promise'
import superprefix from 'superagent-prefix'
import { Promise } from 'es6-promise'

const agent = superpromise(superagent, Promise)

export default agent

export const server = superprefix('http://localhost:3001')