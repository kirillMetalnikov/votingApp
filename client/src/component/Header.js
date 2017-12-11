import React, {Component} from 'react';

class Header extends Component {

  render () {
    switch (this.props.user._id) {
      case undefined:
        return (
          <ul>
            <li>Home</li>
          </ul>
        )
      case null:
        return (
          <ul>
            <li>Home</li>
            <li><a href="/login">Login</a></li>
          </ul>
        )
      default:
      return (
        <ul>
          <li>Home</li>
          <li>Your polls</li>
          <li><a href="/logout">Logout</a></li>
        </ul>
      )
    }
  }
}

export default Header;
