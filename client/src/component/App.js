import React, {Component} from 'react';
import {BrowserRouter, Route, HashRouter} from 'react-router-dom'
import { connect } from 'react-redux';

import Header from './Header.js';
import ListVotes from './ListVotes.js';
import DashBoard from './DashBoard.js';
import NewPoll from './NewPoll.js';
import Login from './Login.js';
import VoteForm from './VoteForm.js';

import {getCurrentUser} from '../actions';

class App extends Component {

  componentDidMount() {
    this.props.getCurrentUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header/>
            <Route exact path='/' component={ListVotes} />
            <Route exact path='/poll/:id' component={VoteForm} />
            <Route exact path='/dashboard' component={DashBoard} />
            <Route exact path='/new_poll' component={NewPoll} />
            <Route exact path='/login' component={Login} />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}

export default connect(null, {getCurrentUser})(App);
