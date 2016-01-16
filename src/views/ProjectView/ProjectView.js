import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { actions as counterActions } from '../../redux/modules/counter'
import styles from './ProjectView.scss'
import FooterView from 'views/FooterView/FooterView'
import IssuesListView from 'views/IssuesListView/IssuesListView'

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  counter: state.counter
})
export class ProjectView extends React.Component {
  static propTypes = {
    counter: React.PropTypes.number.isRequired,
    doubleAsync: React.PropTypes.func.isRequired,
    increment: React.PropTypes.func.isRequired
  };

  render () {
    return (
      <div className='container'>
        <div className="page-header">
          <h1>
          <span className="fa-stack">
            <i className="fa fa-circle fa-stack-2x"></i>
            <i className="fa fa-rocket fa-stack-1x fa-inverse"></i>
          </span>
          {this.props.params.projectKey}
          </h1>
        </div>

        <IssuesListView/>

        <FooterView/>
      </div>
    )
  }
}

export default connect(mapStateToProps, counterActions)(ProjectView)