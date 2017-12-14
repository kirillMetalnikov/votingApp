import React, {Component} from 'react';

import NewPoll from './NewPoll';
import MyPolls from './MyPolls';

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNewPoll: false
    }

    this.handleClickMyPolls = this.handleClickMyPolls.bind(this);
    this.handleClickNew = this.handleClickNew.bind(this);
    this.renderModule = this.renderModule.bind(this);
  }

  handleClickMyPolls(e) {
    e.preventDefault();
    this.setState({isNewPoll: false});
  }

  handleClickNew(e) {
    e.preventDefault();
    this.setState({isNewPoll: true});
  }

  renderModule() {
    if(this.state.isNewPoll) return (<NewPoll/>);
    return (<MyPolls/>);
  }

  render() {
    return (
      <div>
        <h3>DashBoard</h3>
        <button onClick = {this.handleClickMyPolls} >My polls</button>
        <button onClick = {this.handleClickNew} >New</button>
        {this.renderModule()}
      </div>
    )
  }
};

export default DashBoard;
