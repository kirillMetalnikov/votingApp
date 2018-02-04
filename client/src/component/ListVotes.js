import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';
import {Row, PageHeader, ListGroup, ListGroupItem} from 'react-bootstrap';

import {getPolls} from '../actions';

class ListVotes extends Component {
  componentDidMount() {
      this.props.getPolls();
  }
  renderList() {
    var {polls} = this.props;
    return (
        polls.map( poll => {
          return (
            <ListGroupItem key = {poll._id} >
              <Link to={"/poll/" + poll._id}>{poll.question}</Link>
            </ListGroupItem>
          )
        })
    )
  };

  render () {
    return (
      <Row>
        <PageHeader>List of votes</PageHeader>
        <ListGroup>
          {this.renderList()}
        </ListGroup>
      </Row>
    )
  }
}

const mapStateToProps = ({polls}) => {
  return {polls};
}
export default connect( mapStateToProps, {getPolls})(ListVotes);
