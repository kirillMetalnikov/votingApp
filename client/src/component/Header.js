import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Navbar, Nav, NavItem} from 'react-bootstrap'

class Header extends Component {
  render() {
    switch (this.props.user) {
      case undefined:
        return (
          <Navbar>
            <Nav>
              <NavItem>
                <Link to='/'>
                  Home
                </Link>
              </NavItem>
            </Nav>
          </Navbar>)
      case false:
        return (
          <Navbar>
            <Nav>
              <NavItem>
                <Link to='/'>
                  Home
                </Link>
              </NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem href="/login">
                Login
              </NavItem>
            </Nav>

        </Navbar>)
      default:
        return (
          <Navbar>
            <Nav>
              <NavItem>
                <Link to='/'>
                  Home
                </Link>
              </NavItem>
              <NavItem>
                <Link to='/dashboard'>
                  Your polls
                </Link>
              </NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem href="/logout">
                Logout
              </NavItem>
            </Nav>
        </Navbar>)
    }
  }
}

function mapStateToProps({user}) {
  return {user};
}
export default connect(mapStateToProps)(Header);
