import superagent from 'superagent'
import superpromise from 'superagent-promise'
import { Promise } from 'es6-promise'

const agent = superpromise(superagent, Promise)

export default agent

export function pathFor(resource) {
  return 'http://localhost:3001' + resource
}
