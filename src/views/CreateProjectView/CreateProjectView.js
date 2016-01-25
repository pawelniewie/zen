import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import { Form, ValidatedInput } from 'react-bootstrap-validation'
import { add } from '../../redux/modules/ProjectsActions'
// import styles from './CreateProjectView.scss'

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  counter: state.counter
})
export class CreateProjectView extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired
  };

  _handleValidSubmit (values) {
    this.props.dispatch(add(values))
  }

  _handleInvalidSubmit (errors, values) {
    // Errors is an array containing input names
    // that failed to validate
  }

  render () {
    return (
      <div className='container'>
        <div className='page-header'>
          <h1>
          <span className='fa-stack'>
            <i className='fa fa-circle fa-stack-2x'></i>
            <i className='fa fa-rocket fa-stack-1x fa-inverse'></i>
          </span>
          Create project
          </h1>
        </div>

        <Form className='form-horizontal' onValidSubmit={this._handleValidSubmit.bind(this)} onInvalidSubmit={this._handleInvalidSubmit.bind(this)}>
          <ValidatedInput
            type='text'
            label='Name'
            labelClassName='col-sm-2'
            wrapperClassName='col-sm-4'
            name='name'
            validate='required'
            errorHelp={{
              required: 'Please enter project name'
            }}/>

          <ValidatedInput
            type='text'
            label='Key'
            labelClassName='col-sm-2'
            wrapperClassName='col-sm-4'
            name='key'
            validate='required'
            errorHelp={{
              required: 'Please enter project key'
            }}/>

          <div className='form-group'>
            <label htmlFor='description' className='col-sm-2 control-label'>Description</label>
            <div className='col-sm-4'>
              <textarea className='form-control' id='description' rows='5' placeholder='Description'/>
            </div>
          </div>

          <div className='form-group'>
            <div className='col-sm-offset-2 col-sm-4'>
              <Button bsStyle='primary' type='submit'>Create</Button>
            </div>
          </div>
        </Form>
      </div>
    )
  }
}

export default connect(mapStateToProps)(CreateProjectView)
