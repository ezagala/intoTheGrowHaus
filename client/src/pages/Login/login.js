import React from "react";
import { Col, Row, Container } from "../../components/Grid";
import { Input, SearchBtn } from "../../components/Form";

class Home extends Component {
    state = {
        username: "", 
        password: ""
    };

    componentDidMount() {
        
    }

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
                        </form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Home;
