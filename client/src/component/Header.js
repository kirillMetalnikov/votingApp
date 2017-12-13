import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Header extends Component {
  render() {
    switch (this.props.user) {
      case undefined:
        return (
          <ul>
            <Link to='/'>Home</Link>
          </ul>)
      case false:
        return (
          <ul>
            <Link to='/'>Home</Link>
            <li>
              <a href="/login">Login</a>
            </li>
        </ul>)
      default:
        return (
          <ul>
            <Link to='/'>Home</Link>
            <Link to='/dashboard'>Your polls</Link>
            <li>
              <a href="/logout">Logout</a>
            </li>
        </ul>)
    }
  }
}

function mapStateToProps({user}) {
  return {user};
}
export default connect(mapStateToProps)(Header);
