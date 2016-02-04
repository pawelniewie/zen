import React, { PropTypes as PT } from 'react'
import { connect } from 'react-redux'
import { actions as issuesActions } from '../../redux/modules/IssuesActions'
import Icons from '../../components/Icons'
import { Link } from 'react-router'
// import styles from './IssuesListView.scss'

class NoIssues extends React.Component {
  render() {
    return (
      <div>Hey, there are no issues yet. You can <Link to='/issues/new'>create one</Link> right now!</div>
    )
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
        children.push(
          <div key="issues-table" className='table-responsive'>
            <table className='table table-striped'>
              <tbody>
                <tr>
                  <th scope='row'>TEST-1</th>
                  <td>Add project name</td>
                </tr>
                <tr>
                  <th scope='row'>TEST-2</th>
                  <td>Add issue icons</td>
                </tr>
                <tr>
                  <th scope='row'>TEST-3</th>
                  <td>Each issue should be a link to issue view</td>
                </tr>
                <tr>
                  <th scope='row'>TEST-4</th>
                  <td>On issue list show issue key</td>
                </tr>
                <tr>
                  <th scope='row'>TEST-5</th>
                  <td>Add recently completed issues</td>
                </tr>
                <tr>
                  <th scope='row'>TEST-6</th>
                  <td>Show a list of team members in the project</td>
                </tr>
              </tbody>
            </table>
          </div>)
      } else {
        children.push(<NoIssues key="zero"/>)
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
