import React from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router'
import { actions as counterActions } from '../../redux/modules/counter'
// import styles from './IssuesListView.scss'

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
      <div className='table-responsive'>
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
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, counterActions)(IssueView)
