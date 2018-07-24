import React from "react";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import "./NoMatch.css"

const NoMatch = () => (
  <Container fluid>
    <Row>
      <Col size="md-12">
      <div className="noMatchbody">
        <Jumbotron>
          <h1>404 Page Not Found</h1>
          <hr/>
          <h1>
            <span>
              Check yo self
            </span>
          </h1>
        </Jumbotron>
        </div>
      </Col>
    </Row>
  </Container>
);

export default NoMatch;
