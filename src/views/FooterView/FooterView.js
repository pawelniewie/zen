import React from 'react'
import { Link } from 'react-router'
// import { actions as counterActions } from '../../redux/modules/counter'
// import styles from './FooterView.scss'

export default class FooterView extends React.Component {
  render () {
    return (
        <div>
          <hr />
          <Link to='/404'>Go to 404 Page</Link><br/>
          <Link to='/projects/TEST'>Go to Test project</Link><br/>
          <Link to='/projects'>Go to projects</Link><br/>
          <Link to='/issues/TEST-1'>Go to TEST-1 issue</Link><br/>
        </div>
    )
  }
}
