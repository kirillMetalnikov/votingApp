import React, {Component} from 'react';
import {connect} from 'react-redux';

import NewPoll from './NewPoll';
import MyPolls from './MyPolls';
import {setIsNewPoll} from '../actions'

class DashBoard extends Component {
  constructor(props) {
    super(props);

    this.handleClickMyPolls = this.handleClickMyPolls.bind(this);
    this.handleClickNew = this.handleClickNew.bind(this);
  }

  handleClickMyPolls(e) {
    e.preventDefault();
    this.props.setIsNewPoll(false);
  }

  handleClickNew(e) {
    e.preventDefault();
    this.props.setIsNewPoll(true);
  }

  render() {
    return (
      <div>
        <h3>DashBoard</h3>
        <button onClick = {this.handleClickMyPolls} >My polls</button>
        <button onClick = {this.handleClickNew} >New</button>
        <MyPolls/>
        <NewPoll/>
      </div>
    )
  }
};

export default connect(null, {setIsNewPoll})(DashBoard);
