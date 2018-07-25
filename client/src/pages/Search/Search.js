import React, { Component } from "react";
// import {Redirect} from "react-router-dom";
import DatePicker from 'react-date-picker';
import { FormGroup, ControlLabel, FormControl, ListGroup, ListGroupItem} from 'react-bootstrap';
import moment from 'moment';
import API from "../../utils/API";
import "./Search.css"
import Nav from "../../components/Nav"
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { SearchBtn } from "../../components/Form";

class Search extends Component {    
    state = {
        customer: '',
        startDate: '',
        endDate: '',
        transactions: [], 
    };

    componentDidMount() {
        // this.loadTransactions();
    }

    loadTransactions = data => {
        // Data cannont be undefined b/c this is fired when the component mounts    
        if (data) {
            this.setState({ transactions: data });
            console.log("State.transactions upated to: ", this.state.transactions);
        }
        
    };

    onStartDateChange = startDate => this.setState({ startDate });
    onEndDateChange = endDate => this.setState({ endDate });

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        API.query({
            startDate: this.state.startDate, 
            endDate: this.state.endDate,    
            customer: this.state.customer.toString()
        })
            .then( res => {
                const transactions = res.data
            
                // for (const data in transactions) {
                //     transactions.push(transactions[data]); 
                // }
 
                this.loadTransactions(transactions);
                console.log("Response: ", transactions); 
            })
            .catch(err => console.log(err)); 


    };

    render() {
        return (
            <div>
                <Nav onClick={this.logout} />
                <Container fluid>
                    <Row>
                        <Col size="md-6">
                            <div className="searchForm">
                                <h1>Search</h1>
                                <hr />
                                <form>
                                    <FormGroup controlId="customerSelect">
                                        <ControlLabel>Customer Type</ControlLabel>
                                        <FormControl 
                                            value={this.state.customer} 
                                            onChange={this.handleInputChange}
                                            name="customer"
                                            componentClass="select" 
                                            placeholder="select">
                                            <option value="select">Select...</option>
                                            <option value="1">Zone One</option>
                                            <option value="2">Zone Two</option>
                                            <option value="3">Zone Three</option>
                                        </FormControl>
                                    </FormGroup>
                                    <FormGroup controlId="loyaltyCustomer"  >
                                        <ControlLabel>Or:  Loyalty Customer</ControlLabel>
                                        <FormControl 
                                            value={this.state.customer} 
                                            onChange={this.handleInputChange}  
                                            name="customer"
                                            type="text" 
                                            placeholder="Phone Number (like 3335557777)" 
                                        />
                                    </FormGroup>
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
                        <Col size="md-6" >
                            <div className="resultsPanel">
                                <h1>Results</h1>
                                <hr />
                                {this.state.transactions.length ? (
                                    <List>
                                        {this.state.transactions.map(transaction => (
                                            <ListGroupItem key={transaction._id}>
                                                <h4>Transaction ID: {transaction.transID}</h4>
                                                <hr/> 
                                                <ListGroup>
                                                    <p>- Customer: {transaction.customer}</p>
                                                    <p>- Date: {moment(transaction.date).format("MM/DD/YYYY")}</p>
                                                    <p>- Tender Type: {transaction.tenderType}</p>
                                                    <p>- Total: ${transaction.transTotal}</p>
                                                </ListGroup>
                                            </ListGroupItem>
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
        );
    };
};

export default Search;

// function FieldGroup({ id, label, help, ...props }) {
//     return (
//         <FormGroup controlId={id}>
//             <ControlLabel>{label}</ControlLabel>
//             <FormControl {...props} />
//             {help && <HelpBlock>{help}</HelpBlock>}
//         </FormGroup>
//     );
// }
