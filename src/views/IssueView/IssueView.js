import React from 'react'
import { connect } from 'react-redux'
import { actions as counterActions } from '../../redux/modules/counter'
// import styles from './IssueView.scss'
import FooterView from 'views/FooterView/FooterView'

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
    params: React.PropTypes.shape({
      issueKey: React.PropTypes.string.isRequired
    })
  };

  render () {
    return (
      <div className='container'>
        <div className='page-header'>
          <h1>
          <span className='fa-stack'>
            <i className='fa fa-circle fa-stack-2x'></i>
            <i className='fa fa-rocket fa-stack-1x fa-inverse'></i>
          </span>
          {this.props.params.issueKey}
          </h1>
        </div>

        <FooterView/>
      </div>
    )
  }
}

export default connect(mapStateToProps, counterActions)(IssueView)
