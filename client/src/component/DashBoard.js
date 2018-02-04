import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, PageHeader, Button} from 'react-bootstrap';

import NewPoll from './NewPoll';
import MyPolls from './MyPolls';
import {setIsNewPoll} from '../actions'

class DashBoard extends Component {
  constructor(props) {
    super(props);

    this.handleClickNew = this.handleClickNew.bind(this);
  }

  handleClickNew(e) {
    e.preventDefault();
    this.props.setIsNewPoll(true);
  }

  render() {
    return (
      <Row>
        <PageHeader>Your pools</PageHeader>
        <MyPolls/>
        <NewPoll/>
        <Button onClick = {this.handleClickNew} >New</Button>
      </Row>
    )
  }
};

export default connect(null, {setIsNewPoll})(DashBoard);
