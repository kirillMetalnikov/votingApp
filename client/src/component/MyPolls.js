import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {userPolls, deletePoll} from '../actions';
import VoteForm from './VoteForm.js';

class MyPolls extends Component {
  constructor (props){
    super(props);
    this.state = {
      active: ""
    }
  }


  componentDidMount() {
    this.props.userPolls();
  }

  clickHundler(pollID) {
    return () => this.setState({active: pollID})
  }

  deleteHundler(pollID) {
    return () => this.props.deletePoll(pollID);
  }

  renderList() {
    var {polls} = this.props;
    var {active} = this.state;
    return (
        polls.map( poll => {
          if(poll._id == active) {
            return (
              <div key = {poll._id} >
                <VoteForm id={poll._id} />
                <button onClick = {this.deleteHundler(poll._id)}>Delete</button>
              </div>
            )
          }
          return (
            <div key = {poll._id} >
              <span onClick = {this.clickHundler(poll._id)}>{poll.question}</span>
              <button onClick = {this.deleteHundler(poll._id)}>Delete</button>
            </div>
          )
        })
    )
  }

  render(){
    return(
      <div>
        <h3>YourVotes</h3>
        {this.renderList()}
      </div>
    )
  }
}

const mapStateToProps = ({polls}) => {
  return {polls};
}
export default connect(mapStateToProps, {userPolls, deletePoll})(MyPolls);
