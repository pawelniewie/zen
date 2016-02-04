import React, { PropTypes as PT } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { actions as projectsActions } from '../../redux/modules/ProjectsActions'
import { actions as issuesActions } from '../../redux/modules/IssuesActions'
import Icons from '../../components/Icons'
// import styles from './IssueView.scss'

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  fetchingProjects: state.projects.fetchingAll,
  allProjects: state.projects.all
})
export class IssueView extends React.Component {
  static propTypes = {
    allProjects: PT.any,
    fetchingProjects: PT.bool,
    projects: PT.shape({
      fetchAll: PT.func
    })
  };

  componentDidMount () {
    if (!this.props.allProjects || !this.props.allProjects.length) {
      this.props.projects.fetchAll()
    }
  }

  render () {
    var projects = (<Icons.Loading/>)

    if (!this.props.fetchingProjects && this.props.allProjects && this.props.allProjects.length > 0) {
      var options = this.props.allProjects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)
      projects = (
        <select className='form-control' id='project'>
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

        <form className='form-horizontal'>
          <div className='form-group'>
            <label htmlFor='project' className='col-sm-2 control-label'>Project</label>
            <div className='col-sm-10'>
              {projects}
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='summary' className='col-sm-2 control-label'>Summary</label>
            <div className='col-sm-10'>
              <input type='text' className='form-control' id='summary' placeholder='Summary'/>
            </div>
          </div>
          <div className='form-group'>
            <label htmlFor='description' className='col-sm-2 control-label'>Description</label>
            <div className='col-sm-10'>
              <textarea className='form-control' id='description' rows='5' placeholder='Description'/>
            </div>
          </div>
          <div className='form-group'>
            <div className='col-sm-offset-2 col-sm-10'>
              <button type='submit' className='btn btn-primary'>Create</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default connect(mapStateToProps, (dispatch) => ({
  projects: bindActionCreators(projectsActions, dispatch),
  issues: bindActionCreators(issuesActions, dispatch)
}))(IssueView)
