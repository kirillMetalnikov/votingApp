import React, {Component} from 'react';
import {Row, PageHeader, Button} from 'react-bootstrap';

class Login extends Component {
  render() {
    return (
      <div>
        <div style = {{margin: '5px'}}>
          <a href="/auth/github">
            <div className="btn login-btn">
              <img src="/public/img/github_32px.png" alt="github logo" />
              <p>LOGIN WITH GITHUB</p>
            </div>
          </a>
        </div>
        <div style = {{margin: '5px'}}>
          <a href="/auth/google">
            <div className="btn login-btn">
              <img src="/public/img/google_32px.png" alt="google logo" />
              <p>LOGIN WITH GOOGLE</p>
            </div>
          </a>
        </div>
      </div>
    )
  }
}

export default Login;
