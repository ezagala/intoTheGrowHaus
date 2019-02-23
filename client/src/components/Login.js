import React, { Fragment, Component } from 'react'; 
import { Redirect } from 'react-router-dom'; 

import LoginBackground from '../styled/LoginBackground'
import Wrapper from '../styled/layout/Wrapper'; 
import AnimateUp from '../components/AnimateUp'; 
import HeadingOne from '../styled/HeadingOne'

import GoogleLogin from 'react-google-login'; 
import config from '../config.json'

const googleButtonStyle = {
  display: 'inline-block', 
  background: 'rgb(209, 72, 54)', 
  color: 'rgb(255, 255, 255)',
  width: '190px',
  padding: '10px 0 10px 0',
  margin: '0 0 10px 0 ',
  border: '1px solid transparent',
  borderRadius: '2px',
  fontWeight: 'bold'
}

export default class Login extends Component { 
  state = {
    isAuthenticated: false,
    user: null, 
    token: null
  }; 

  onFailure = error => console.error(error); 

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  loginWithGoogle = (response) => {
    const tokenBlob = new Blob([JSON.stringify({ access_token: response.accessToken }, null, 2)], { type: 'application/json' });
    const options = {
        method: 'POST',
        body: tokenBlob,
        mode: 'cors',
        cache: 'default'
    };

    fetch('/api/transactions/auth', options)
      .then(r => {
        const token = r.headers.get('x-auth-token');
        r.json().then(user => {
            if (token) {
                this.setState({ isAuthenticated: true, user, token })
            }
        });
      });
  };

  render() { 
    const { isAuthenticated, user, token } = this.state; 
    return (
      isAuthenticated && user && token ? 
      <Redirect to="/Search" />
        : 
        <Fragment>
          <LoginBackground />
          <AnimateUp>
            <Wrapper
              width="20%"
              height="65%"
              margin="5% auto 0 auto"
              background="rgba(218, 223, 225, .95)"
              borderRadius="10px"
              login
            >
              <HeadingOne margin="25px 0 20px 0">Welcome!</HeadingOne>
              <p>Login with Google below:</p>
              <GoogleLogin
                style={googleButtonStyle}
                clientId={config.GOOGLE_CLIENT_ID}
                buttonText="Login"
                onSuccess={this.loginWithGoogle}
                onFailure={this.loginWithGoogle}
              />
            </Wrapper>
          </AnimateUp>
        </Fragment>
    )
  }
}