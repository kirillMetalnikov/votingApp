import React, { Component } from 'react';
import axios from 'axios';

import Header from './Header.js';
import ListVotes from './ListVotes.js';

class App extends Component {
  constructor (){
    super();
    this.state ={
      user: {_id: undefined}
    }
  }

  getUser () {
    axios
      .get('/api/current_user')
      .then( res => {
        console.log(res.data)
        this.setState(
          res.data
        )
      })
  }

  componentDidMount() {
    this.getUser();
  }

  render () {
    return (
      <div>
        <Header user = {this.state.user}/>
        <ListVotes />
      </div>

    )
  }
}

export default App;
