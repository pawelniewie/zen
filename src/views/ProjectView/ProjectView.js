import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as projectsActions } from '../../redux/modules/ProjectsActions'
import ProjectKey from '../../components/ProjectKey'
// import styles from './ProjectView.scss'
import IssuesListView from 'views/IssuesListView/IssuesListView'
import Icons from '../../components/Icons'

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state, ownProps) => ({
  projectKey: ownProps.params.projectKey,
  currentProject: state.projects.currentProject
})
export class ProjectView extends React.Component {
  static propTypes = {
    projectKey: PropTypes.string.isRequired,
    currentProject: PropTypes.shape({
      name: PropTypes.string,
      key: PropTypes.string,
      isSyncing: PropTypes.bool.isRequired,
      description: PropTypes.string
    }),
    fetchByKey: PropTypes.func.isRequired
  };

  componentDidMount () {
    this.props.fetchByKey(this.props.projectKey)
  }

  render () {
    var children = []

    if (this.props.currentProject && this.props.currentProject.isSyncing === false) {
      children.push(
        <div key='page-header' className='page-header'>
          <h1>
            <span className='fa-stack'>
              <i className='fa fa-circle fa-stack-2x'></i>
              <i className='fa fa-rocket fa-stack-1x fa-inverse'></i>
            </span>
            {this.props.currentProject.name} <ProjectKey projectKey={this.props.currentProject.key}/>
          </h1>
        </div>
      )

      children.push(
        <IssuesListView key='issues' {...this.props}/>
      )
    } else {
      children.push(<Icons.Loading key='loading'/>)
    }

    return (
      <div className='container'>
        {children}
      </div>
    )
  }
}

export default connect(mapStateToProps, projectsActions)(ProjectView)
