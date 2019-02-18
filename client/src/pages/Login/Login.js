import React, { Component } from "react";
import { Redirect } from "react-router-dom";
// import API from "../../utils/API";
import "./Login.css"
import { Col, Row, Container } from "../../components/Grid";
// import { Input, LoginBtn } from "../../components/Form";
import { GoogleLogin } from 'react-google-login';
import config from '../../config.json';

class Login extends Component {

    state = {
        isAuthenticated: false,
        user: null,
        token: null
    };  
  
  onFailure = error => console.error(error); 

  googleResponse = (response) => {
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
            this.setState({ 
              isAuthenticated: true, 
              user: user, 
              token: token
            })
          }
        });
      });
  };
    
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
    
  render() {
    const { isAuthenticated, user, token } = this.state

    return (
      isAuthenticated && user && token ? 
      <Redirect to="/Search" />
        : 
      <Container fluid >
          <Row>
              <Col size="md-4"></Col>
              <Col size="md-4">
                  <form className="welcomeForm">
                      <h1>Welcome!</h1>
                      <h4>Login with Google below</h4>
                      <hr />
                      <GoogleLogin
                          clientId={config.GOOGLE_CLIENT_ID}
                          buttonText="Login"
                          onSuccess={this.googleResponse}
                          onFailure={this.googleResponse}
                      />
                  </form>
              </Col>
              <Col size="md-4"></Col>
          </Row>
      </Container>
    )
  }
}

export default Login;
