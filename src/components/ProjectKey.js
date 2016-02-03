import React from 'react'
import { Label } from 'react-bootstrap'

export default class ProjectKey extends React.Component {
  static propTypes = {
    projectKey: React.PropTypes.string.isRequired
  };

  render () {
    return (
      <Label bsStyle='primary'>{this.props.projectKey}</Label>
    )
  }
}
