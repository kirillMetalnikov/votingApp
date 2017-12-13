import React, { Component } from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';

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
            <div key = {poll._id} >
              <Link to={"/poll/" + poll._id}>{poll.question}</Link>
            </div>
          )
        })
    )
  };

  render () {
    return (
      <div>
        <h3>ListVotes</h3>
        {this.renderList()}
      </div>
    )
  }
}

const mapStateToProps = ({polls}) => {
  return {polls};
}
export default connect( mapStateToProps, {getPolls})(ListVotes);
