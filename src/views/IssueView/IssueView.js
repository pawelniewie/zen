import React, { PropTypes as PT } from 'react'
import { connect } from 'react-redux'
import { actions as issuesActions } from '../../redux/modules/IssuesActions'
import ProjectKey from '../../components/ProjectKey'
import Icons from '../../components/Icons'
// import styles from './IssueView.scss'

class IssuesDetailsView extends React.Component {

}

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state, ownProps) => ({
  projectKey: ownProps.params.projectKey,
  currentIssue: state.projects.currentIssue
})
export class IssueView extends React.Component {
  static propTypes = {
    issueKey: PT.string.isRequired,
    fetchByKey: PT.func.isRequired,
    currentIssue: PT.shape
  };

  componentDidMount () {
    this.props.fetchByKey(this.props.issueKey)
  }

  render () {
    var children = []

    if (this.props.currentIssue && this.props.currentIssue.isSyncing === false) {
      children.push(
        <div key='page-header' className='page-header'>
          <h1>
            <span className='fa-stack'>
              <i className='fa fa-circle fa-stack-2x'></i>
              <i className='fa fa-rocket fa-stack-1x fa-inverse'></i>
            </span>
            {this.props.currentIssue.summary} <ProjectKey projectKey={this.props.currentIssue.key}/>
          </h1>
        </div>
      )

      children.push(
        <IssuesDetailsView key='details' {...this.props}/>
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

export default connect(mapStateToProps, issuesActions)(IssueView)
