import React, {Component} from 'react';
import {Row, PageHeader, Button} from 'react-bootstrap';

class Login extends Component {
  render() {
    return (
      <Row>
        <a href="/auth/github">
          <div className="btn login-btn">
            <img src="/public/img/github_32px.png" alt="github logo" />
            <p>LOGIN WITH GITHUB</p>
          </div>
        </a>
        <a href="/auth/google">
          <div className="btn login-btn">
            <img src="/public/img/google_32px.png" alt="google logo" />
            <p>LOGIN WITH GOOGLE</p>
          </div>
        </a>
      </Row>
    )
  }
}

export default Login;
