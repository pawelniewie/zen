import React from 'react'
import FooterView from 'views/FooterView/FooterView'

export class NotFoundView extends React.Component {
  render () {
    return (
      <div className='container text-center'>
        <h1>This is a demo 404 page!</h1>
        <FooterView/>
      </div>
    )
  }
}

export default NotFoundView
