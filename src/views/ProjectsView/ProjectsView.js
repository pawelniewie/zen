import React from 'react'
import { connect } from 'react-redux'
import styles from './ProjectsView.scss'
import { fetchAll } from '../../redux/modules/ProjectsActions'
import { Label } from 'react-bootstrap'

function getColour (isSyncing, error) {
  return isSyncing ? 'yellow' : (error ? 'red' : 'green')
}

class Project extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    project: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      key: React.PropTypes.string.isRequired
    }),
    isSyncing: React.PropTypes.boolean,
    error: React.PropTypes.any
  };

  render () {
    return (
      <div style={{color: getColour(this.props.isSyncing, this.props.error)}}>
        {this.props.project.name} <Label bsStyle='primary'>{this.props.project.key}</Label>
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
  projects: state.projects
})
export class ProjectsView extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    projects: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      key: React.PropTypes.string.isRequired
    })),
    counter: React.PropTypes.number.isRequired,
    doubleAsync: React.PropTypes.func.isRequired,
    increment: React.PropTypes.func.isRequired
  };

  componentDidMount () {
    this.props.dispatch(fetchAll())
  }

  render () {
    return (
      <div className='container text-center'>
        <h1>Welcome to Projects View</h1>
        <h2>
          Sample Counter:&nbsp;
          <span className={styles['counter--green']}>{this.props.counter}</span>
        </h2>
        <div>
          {this.props.projects.map((project, i) => <Project key={project._id} project={project} />)}
        </div>

      </div>
    )
  }
}

export default connect(mapStateToProps)(ProjectsView)
