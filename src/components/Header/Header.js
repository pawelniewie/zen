import React from 'react'
import { Link } from 'react-router'
// import { actions as counterActions } from '../../redux/modules/counter'
// import styles from './Header.scss'

export default class Header extends React.Component {
  render () {
    return (
      <nav className='navbar navbar-default'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#bs-example-navbar-collapse-1' aria-expanded='false'>
              <span className='sr-only'>Toggle navigation</span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
            </button>
            <Link className='navbar-brand' to='/'><i className='fa fa-bug'/></Link>
          </div>

          <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
            <ul className='nav navbar-nav'>
              <li><Link to='/issues/new'>Create issue</Link></li>
            </ul>
          </div>
        </div>
      </nav>
      )
  }
}
