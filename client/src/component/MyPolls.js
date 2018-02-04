import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Row, PageHeader, ListGroup, ListGroupItem, Button} from 'react-bootstrap';

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
              <VoteForm key = {poll._id}  id={poll._id} delete = {this.deleteHundler(poll._id)}/>
            )
          }
          return (
            <ListGroupItem  key = {poll._id} >
              <span onClick = {this.clickHundler(poll._id)}>{poll.question}</span>
              <Button className="pull-right" bsSize="xsmall" onClick = {this.deleteHundler(poll._id)}>Delete</Button>
            </ListGroupItem >
          )
        })
    )
  }

  render(){
    return(
        <ListGroup>
          {this.renderList()}
        </ListGroup>
    )
  }
}

const mapStateToProps = ({polls}) => {
  return {polls};
}
export default connect(mapStateToProps, {userPolls, deletePoll})(MyPolls);
