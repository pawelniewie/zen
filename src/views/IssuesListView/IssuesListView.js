import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { actions as counterActions } from '../../redux/modules/counter'
import styles from './IssuesListView.scss'

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  counter: state.counter
})
export class IssueView extends React.Component {
  static propTypes = {
    counter: React.PropTypes.number.isRequired,
    doubleAsync: React.PropTypes.func.isRequired,
    increment: React.PropTypes.func.isRequired
  };

  render () {
    return (
      <div>
      <h4>Open issues:</h4>
<ul className="list-group">
  <li className="list-group-item">Add project name</li>
  <li className="list-group-item">Add issue icons</li>
  <li className="list-group-item">Each issue should be a link to issue view</li>
  <li className="list-group-item">On issue list show issue key</li>
  <li className="list-group-item">Add recently completed issues</li>
  <li className="list-group-item">Show a list of team members in the project</li>
</ul>
      </div>
    )
  }
}

export default connect(mapStateToProps, counterActions)(IssueView)
