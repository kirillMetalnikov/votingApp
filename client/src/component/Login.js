import React, {Component} from 'react';

class Login extends Component {
  render() {
    return (
      <a href="/auth/github">
        <div className="btn" id="login-btn">
          <img src="/public/img/github_32px.png" alt="github logo" />
          <p>LOGIN WITH GITHUB</p>
        </div>
      </a>
    )
  }
}

export default Login;
