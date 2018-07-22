import React, { Component } from "react";
import DatePicker from 'react-date-picker';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
// import moment from 'moment';
// import API from "../../utils/API";
import "./Search.css"
import Nav from "../../components/Nav"
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { SearchBtn } from "../../components/Form";

class Search extends Component {
    state = {
        customer: null,
        startDate: null,
        endDate: null,
        transactions: []
    };

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
            <div>
                <Nav />

                <Container fluid>
                    <Row>

                        <Col size="md-6">
                            <div className="searchForm">
                                <h1>Search</h1>
                                <hr />
                                <form >
                                    <FormGroup controlId="customerSelect">
                                        <ControlLabel>Customer Type</ControlLabel>
                                        <FormControl componentClass="select" placeholder="select">
                                            <option value="select">Select...</option>
                                            <option value="customerOne">Zone One</option>
                                            <option value="customerTwo">Zone Two</option>
                                            <option value="customerThree">Zone Three</option>
                                        </FormControl>
                                    </FormGroup>
                                    <FieldGroup
                                        id="loyaltyCustomer"
                                        type="text"
                                        label="Loyalty Customer"
                                        placeholder="Phone Number (like 3335557777)"
                                    />
                                    <p>Between dates</p>
                                    <DatePicker
                                        value={this.state.startDate}
                                        onChange={this.onStartDateChange}
                                        name="startDate"
                                    />
                                    <span> and </span>
                                    <DatePicker
                                        value={this.state.endDate}
                                        onChange={this.onEndDateChange}
                                        name="endDate"
                                    />
                                    <SearchBtn
                                        disabled={!(this.state.customer && this.state.startDate)}
                                        onClick={this.handleFormSubmit}
                                    >
                                        Search
                            </SearchBtn>
                                </form>
                            </div>
                        </Col>
                        <Col size="md-6 sm-12" >
                            <div className="resultsPanel">
                                <h1>Results</h1>
                                <hr />

                                {this.state.transactions.length ? (
                                    <List>
                                        {this.state.transactions.map(transaction => (
                                            <ListItem key={transaction._id}>
                                                <List>
                                                    <ListItem>Transaction ID: {transaction.transID}</ListItem>
                                                    <ListItem>Customer: {transaction.customer}</ListItem>
                                                    <ListItem>Date: {transaction.date}</ListItem>
                                                    <ListItem>Tender Type: {transaction.tenderType}</ListItem>
                                                    <ListItem>Description: {transaction.description}</ListItem>
                                                    <ListItem>Transaction Total: {transaction.transTotal}</ListItem>
                                                </List>
                                            </ListItem>
                                        ))}
                                    </List>
                                ) : (
                                        <h3>No Results to Display</h3>
                                    )}
                            </div>
                        </Col>

                    </Row>
                </Container>
            </div>
        )
    }
}

export default Search;

function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}
