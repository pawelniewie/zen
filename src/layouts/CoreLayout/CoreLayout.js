import React from 'react'
import '../../styles/core.scss'
import Footer from 'components/Footer/Footer'
import Header from 'components/Header/Header'

// Note: Stateless/function components *will not* hot reload!
// react-transform *only* works on component classes.
//
// Since layouts rarely change, they are a good place to
// leverage React's new Stateless Functions:
// https://facebook.github.io/react/docs/reusable-components.html#stateless-functions
//
// CoreLayout is a pure function of it's props, so we can
// define it with a plain javascript function...
function CoreLayout ({ children }) {
  return (
    <div className='page-container'>
      <div className='view-container'>
        <Header/>
        {children}
        <Footer/>
      </div>
    </div>
  )
}

CoreLayout.propTypes = {
  children: React.PropTypes.element
}

export default CoreLayout
