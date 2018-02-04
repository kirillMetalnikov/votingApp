import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Navbar, Nav, NavItem} from 'react-bootstrap'
import {IndexLinkContainer, LinkContainer} from 'react-router-bootstrap'

class Header extends Component {
  render() {
    switch (this.props.user) {
      case undefined:
        return (
          <Navbar>
            <Nav>
              <IndexLinkContainer to='/'>
                <NavItem>
                Home
                </NavItem>
              </IndexLinkContainer>
            </Nav>
          </Navbar>)
      case false:
        return (
          <Navbar>
            <Nav>
              <IndexLinkContainer to='/'>
                <NavItem>
                Home
                </NavItem>
              </IndexLinkContainer>
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
              <IndexLinkContainer to='/'>
                <NavItem>
                Home
                </NavItem>
              </IndexLinkContainer>
              <IndexLinkContainer to='/dashboard'>
                <NavItem>
                Your polls
                </NavItem>
              </IndexLinkContainer>
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

// without {pure: false} an active link don't work
export default connect(mapStateToProps, null, null, {pure: false})(Header);
