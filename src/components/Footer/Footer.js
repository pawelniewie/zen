import React from 'react'
import { Link } from 'react-router'
// import { actions as counterActions } from '../../redux/modules/counter'
// import styles from './Footer.scss'

export default class Footer extends React.Component {
  render () {
    return (
        <div>
          <hr />
          <Link to='/404'>Go to 404 Page</Link><br/>
        </div>
    )
  }
}
