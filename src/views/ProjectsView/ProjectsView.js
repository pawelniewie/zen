import React from 'react'
import { connect } from 'react-redux'
import styles from './ProjectsView.scss'
import { fetchAll } from '../../redux/modules/ProjectsActions'
import { DefaultProjectAvatar } from '../../components/DefaultAvatars'
import ProjectKey from '../../components/ProjectKey'
import { Link } from 'react-router'

function getColour (isSyncing, error) {
  return isSyncing ? 'yellow' : (error ? 'red' : 'green')
}

class ProjectRow extends React.Component {
  static propTypes = {
    project: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      key: React.PropTypes.string.isRequired
    }),
    isSyncing: React.PropTypes.bool,
    error: React.PropTypes.any
  };

  render () {
    return (
      <tr style={{color: getColour(this.props.isSyncing, this.props.error)}}>
        <td>
          <DefaultProjectAvatar/>
        </td>
        <td>
          <Link to={'/projects/' + this.props.project.key}>{this.props.project.name}</Link>
        </td>
        <td>
          <ProjectKey projectKey={this.props.project.key}/>
        </td>
      </tr>
    )
  }
}

class NoProjects extends React.Component {
  render() {
    return (
      <div>Hey, there are no projects yet. You can <Link to='/projects/new'>create one</Link> right now!</div>
    )
  }
}

class ProjectsTable extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    projects: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      key: React.PropTypes.string.isRequired
    }))
  };

  render () {
    return (
      <div className='table-responsive'>
        <table className={'table table-condensed ' + styles['projects-table']}>
          <thead>
            <tr>
              <th className={styles['project-avatar']}></th>
              <th className={styles['project-name']}>Name</th>
              <th className={styles['project-key']}>Key</th>
            </tr>
          </thead>
          <tbody>
            {this.props.projects.map((project, i) => <ProjectRow key={project._id} project={project} />)}
          </tbody>
        </table>
      </div>
    )
  }
}

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  projects: state.projects.all
})
export class ProjectsView extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    projects: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      key: React.PropTypes.string.isRequired
    }))
  };

  componentDidMount () {
    this.props.dispatch(fetchAll())
  }

  render () {
    var children = []

    if (this.props.projects.length > 0) {
      children.push(
        <ProjectsTable key={this.props.projects.length} {...this.props}/>
      )
    } else {
      children.push(
        <NoProjects key="zero"/>
      )
    }

    return (
      <div className='container'>
        <h1>All projects</h1>

        { children }
      </div>
    )
  }
}

export default connect(mapStateToProps)(ProjectsView)
