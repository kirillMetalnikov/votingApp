import React, {Component} from 'react';
import {connect} from 'react-redux';
import {PageHeader, Panel, ListGroup, ListGroupItem, Button} from 'react-bootstrap'

import {getPoll, submitPoll} from '../actions';
import Graph from './Graph'

class VoteForm extends Component {
  constructor(props) {
    super(props);

    // Hmmm, is it good or not with Redux?
    this.state ={
      checked: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    var id = this.props.match ? this.props.match.params.id : this.props.id;
    this.props.getPoll(id);
  }

  handleSubmit(e) {
    e.preventDefault();
    var pollID = this.props.voteForm._id;
    var voteID = this.state.checked;

    if (!voteID) return;
    this.props.submitPoll(pollID, voteID);
    this.setState({checked: null})
  }

  // return function which conclution with "id"
  handleCheck(id) {
    return () => {
      this.setState({checked: id})
    }
  }
  renderButton() {
    var {user, voteForm}  = this.props;
    if (!user) user = {_id: null};
    if(user._id != voteForm.owner) return <Button type ="submit" bsStyle="primary">Vote</Button>
  }

  renderDeleteButton() {
    if(this.props.delete) return (
      <Button className="pull-right" onClick = {this.props.delete}>Delete</Button>
    )
  }

  renderGraph() {
    var {options} = this.props.voteForm
    var sumVotes = options.reduce( (sum, option) => {
      return sum + option.votes
    }, 0)

    if (sumVotes == 0) return null;

    return (
      <Graph width = {"100%"} height = {300} options = {options}/>
    )
  }

  renderOptions() {
    if(!this.props.voteForm) {
      return (<h3>Loading...</h3>);
    };

    return(
      <Panel>
        <Panel.Heading><Panel.Title>{this.props.voteForm.question}</Panel.Title></Panel.Heading>
        <Panel.Body>
          <form onSubmit={this.handleSubmit}>
            <ListGroup>
              {this.props.voteForm.options.map( option => {
                return (
                  <ListGroupItem
                    key={option._id}
                    onClick = {this.handleCheck(option._id)}
                    active = {this.state.checked == option._id && ( this.props.user ? this.props.user._id != this.props.voteForm.owner : true)}
                  >
                    {option.option}: <span className="pull-right"><strong>{option.votes}</strong></span>
                  </ListGroupItem>
                )
              })}
            </ListGroup>
            {this.renderButton()}
          </form>
          {this.renderGraph()}
          {this.renderDeleteButton()}
        </Panel.Body>
      </Panel>
    )
  }

  render() {
    return (
      <div>
        {this.renderOptions()}
      </div>
    )
  }
}

const mapStateToProps = ({voteForm, user}) => {
  return {voteForm, user};
}
export default connect(mapStateToProps, {getPoll, submitPoll})(VoteForm);
