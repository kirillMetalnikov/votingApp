import React, {Component} from 'react';
import {connect} from 'react-redux';

import NewPoll from './NewPoll';
import MyPolls from './MyPolls';
import {setIsNewPoll} from '../actions'

class DashBoard extends Component {
  constructor(props) {
    super(props);
//    this.state = {
//      isNewPoll: false
//    }

    this.handleClickMyPolls = this.handleClickMyPolls.bind(this);
    this.handleClickNew = this.handleClickNew.bind(this);
    this.renderModule = this.renderModule.bind(this);
  }

  handleClickMyPolls(e) {
    e.preventDefault();
    this.props.setIsNewPoll(false);
//    this.setState({isNewPoll: false});
  }

  handleClickNew(e) {
    e.preventDefault();
    this.props.setIsNewPoll(true);
//    this.setState({isNewPoll: true});
  }

  renderModule() {
    if(this.props.isNewPoll) return (<NewPoll/>);
  }

  render() {
    return (
      <div>
        <h3>DashBoard</h3>
        <button onClick = {this.handleClickMyPolls} >My polls</button>
        <button onClick = {this.handleClickNew} >New</button>
        <MyPolls/>
        {this.renderModule()}
      </div>
    )
  }
};

const mapStateToProps = ({isNewPoll}) => {
  return {isNewPoll};
}

export default connect(mapStateToProps, {setIsNewPoll})(DashBoard);
