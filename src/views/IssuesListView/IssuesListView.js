import React, { PropTypes as PT } from 'react'
import { connect } from 'react-redux'
import { actions as issuesActions } from '../../redux/modules/IssuesActions'
import Icons from '../../components/Icons'
import { Link } from 'react-router'
import styles from './IssuesListView.scss'

class NoIssues extends React.Component {
  static propTypes = {
    projectKey: PT.string.isRequired
  };

  render() {
    return (
      <p>
        Hey, there are no issues yet.
        You can <Link to={'/issues/new?projectKey=' + this.props.projectKey}>create one</Link> right now!
      </p>
    )
  }
}

class Issues extends React.Component {
  static propTypes = {
    issues: PT.any,
    issueKey: PT.func.isRequired
  };

  render () {
    var children = this.props.issues.map((issue) => {
      var issueKey = this.props.issueKey(issue)
      return (
        <tr key={issue.id}>
          <th scope='row' className={styles['issue-key']}>
            <Link to={'/issues/' + issueKey}>{issueKey}</Link>
          </th>
          <td><Link to={'/issues/' + issueKey}>{issue.summary}</Link></td>
          <td>{issue.description}</td>
        </tr>
      )
    })
    return (
      <div key="issues-table" className='table-responsive'>
        <table className='table table-striped'>
          <tbody>
            {children}
          </tbody>
        </table>
      </div>)
  }
}

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state, ownProps) => ({
  currentProject: ownProps.currentProject,
  fetchingOpen: state.issues.fetchingOpen,
  issues: state.issues.open
})
export class IssueListView extends React.Component {
  static propTypes = {
    currentProject: PT.shape({
      id: PT.number,
      name: PT.string,
      key: PT.string,
      isSyncing: PT.bool.isRequired,
      description: PT.string
    }),
    fetchingOpen: PT.bool,
    issues: PT.any,
    fetchByProject: PT.func.isRequired
  };

  componentDidMount () {
    this.props.fetchByProject(this.props.currentProject.id)
  }

  render () {
    var children = []

    if (!this.props.fetchingOpen) {
      if (this.props.issues && this.props.issues.length > 0) {
        var issueKey = (issue) => {
          return this.props.currentProject.key + '-' + issue.no
        }
        children.push(<Issues key="issues" {...this.props} issueKey={issueKey}/>)
      } else {
        children.push(<NoIssues key="zero" projectKey={this.props.currentProject.key}/>)
      }
    } else {
      children.push(<Icons.Loading key="loading"/>)
    }

    return (
      <div>
        <h4>Open issues:</h4>

        {children}
      </div>
    )
  }
}
export default connect(mapStateToProps, issuesActions)(IssueListView)
