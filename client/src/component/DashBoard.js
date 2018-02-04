import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, PageHeader, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

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
    if (!this.props.user) return (
      <Row>
        <PageHeader>Your pools</PageHeader>
        To see this page your need <Link to = '/login'>login</Link>!
      </Row>
    )

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


const mapStateToProps = ({user}) => {
  return {user};
}

export default connect(mapStateToProps, {setIsNewPoll})(DashBoard);
