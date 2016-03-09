import React, { PropTypes as PT } from 'react'
import autoBind from 'react-autobind'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as projectsActions } from '../../redux/modules/ProjectsActions'
import { actions as issuesActions, add as addIssue,
  fetchByLocation as fetchIssueByLocation } from '../../redux/modules/IssuesActions'
import { push } from 'react-router-redux'
import Icons from '../../components/Icons'
import { Button } from 'react-bootstrap'
import { Form, ValidatedInput } from 'react-bootstrap-validation'
// import styles from './CreateIssueView.scss'

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  fetchingProjects: state.projects.fetchingAll,
  allProjects: state.projects.all
})
export class CreateIssueView extends React.Component {
  static propTypes = {
    allProjects: PT.any,
    fetchingProjects: PT.bool,
    projects: PT.shape({
      fetchAll: PT.func
    }),
    currentProject: PT.any,
    projectId: PT.any,
    issues: PT.shape({
      selectProject: PT.func.isRequired,
      add: PT.func.isRequired
    }),
    dispatch: PT.func.isRequired
  };

  constructor() {
    super()
    autoBind(this)
  }

  componentDidMount () {
    if (!this.props.allProjects || !this.props.allProjects.length) {
      this.props.projects.fetchAll()
    }
  }

  _handleValidSubmit (values) {
    const dispatch = this.props.dispatch
    const payload = Object.assign({}, values, {project_id: this.props.projectId || this.props.allProjects[0].id})
    dispatch(addIssue(payload))
      .then(action => {
        console.log('location', action)
        return dispatch(fetchIssueByLocation(action.payload))
      })
      .then(action => {
        console.log('issue', action)
        if (action.payload.length) {
          return dispatch(push('/issues/' + action.payload[0].id))
        } else {
          return Promise.resolve()
        }
      })
  }

  _handleInvalidSubmit (errors, values) {
    // Errors is an array containing input names
    // that failed to validate
  }

  _setProjectId (e) {
    this.props.issues.selectProject({projectId: e.target.value})
  }

  render () {
    var projects = (<Icons.Loading/>)

    if (!this.props.fetchingProjects && this.props.allProjects && this.props.allProjects.length > 0) {
      var options = this.props.allProjects.map((project) =>
        <option key={project.id} value={project.id}>{project.name}</option>)
      projects = (
        <select className='form-control' id='project' onChange={this._setProjectId}>
          {options}
        </select>
      )
    }

    return (
      <div className='container'>
        <div className='page-header'>
          <h1>
            <span className='fa-stack'>
              <i className='fa fa-circle fa-stack-2x'></i>
              <i className='fa fa-rocket fa-stack-1x fa-inverse'></i>
            </span>
            Create issue
          </h1>
        </div>

        <Form className='form-horizontal' onValidSubmit={this._handleValidSubmit}
          onInvalidSubmit={this._handleInvalidSubmit}>
          <div className='form-group'>
            <label htmlFor='project' className='col-sm-2 control-label'>Project</label>
            <div className='col-sm-10'>
              {projects}
            </div>
          </div>

          <ValidatedInput
            type='text'
            label='Summary'
            labelClassName='col-sm-2'
            wrapperClassName='col-sm-10'
            name='summary'
            validate='required'
            errorHelp={{
              required: 'Please enter summary'
            }}/>

          <div className='form-group'>
            <label htmlFor='description' className='col-sm-2 control-label'>Description</label>
            <div className='col-sm-10'>
              <textarea className='form-control' id='description' rows='5' placeholder='Description'/>
            </div>
          </div>

          <div className='form-group'>
            <div className='col-sm-offset-2 col-sm-10'>
              <Button bsStyle='primary' type='submit'>Create</Button>
            </div>
          </div>
        </Form>
      </div>
    )
  }
}

export default connect(mapStateToProps, (dispatch) => ({
  projects: bindActionCreators(projectsActions, dispatch),
  issues: bindActionCreators(issuesActions, dispatch),
  dispatch: dispatch
}))(CreateIssueView)
