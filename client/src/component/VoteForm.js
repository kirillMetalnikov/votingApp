import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getPoll, submitPoll} from '../actions';

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
    if(user._id != voteForm.owner) return <button>Vote</button>
  }
  renderOptions() {
    if(!this.props.voteForm) {
      return (<h3>Loading...</h3>);
    };

    return(
      <div>
        <h3>{this.props.voteForm.question}</h3>
        <form onSubmit={this.handleSubmit}>
          {this.props.voteForm.options.map( option => {
            return (
              <div
                key={option._id}
                onClick = {this.handleCheck(option._id)}
                className = {this.state.checked == option._id ? "checked" : ""}
              >
                {option.option}: {option.votes}
              </div>
            )
          })}
          {this.renderButton()}
        </form>
      </div>
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
