import React, { Component } from "react";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { Input, LoginBtn } from "../../components/Form";
import { GoogleLogin } from 'react-google-login';
import config from '../../config.json';

class Login extends Component {
    state = {
        username: "",
        password: "",
        isAuthenticated: false, 
        user: null, 
    };

    googleResponse = (response) => { console.log("The resonse is: ", response)};

    onFailure = (error) => {
        alert(error);
    }

    googleResponse = (response) => {
        console.log(typeof response.accessToken); 
        API.postUser({googleID: response.accessToken}).then(r => {
            this.setState({isAuthenticated: true, user: r.data._id}); 
            console.log(this.state)
        })
    };  

    /* 
    componentDidMount() {
        axios.get('/auth/user').then(response => {
			console.log(response.data)
			if (!!response.data.user) {
				console.log('THERE IS A USER')
				this.setState({
					loggedIn: true,
					user: response.data.user
				})
			} else {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
     }
     */ 

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-4"></Col>
                    <Col size="md-4">
                        <form>
                            <Input
                                value={this.state.username}
                                onChange={this.handleInputChange}
                                name="username"
                                placeholder="Username"
                            />
                            <Input
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                name="password"
                                placeholder="Password"
                            />
                            <LoginBtn
                                disabled={!(this.state.username && this.state.password)}
                                onClick={this.handleFormSubmit}
                            >
                                Login
                            </LoginBtn>
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
        );
    }
}

export default Login;
