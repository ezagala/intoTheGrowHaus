import React, { Component } from "react";
import c3 from "c3";
import DatePicker from 'react-date-picker';
import { FormGroup, ControlLabel, FormControl, ListGroup, ListGroupItem } from 'react-bootstrap';
import moment from 'moment';
import API from "../../utils/API";
import "./Search.css"
import "./c3.css"
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
        columns: [
            ['x'],
            ['Daily totals']
        ]
    };

    componentDidMount() {
        this.renderTrend();
    }

    // Will render a chart that shows the trend of daily sales totals for the entire history
    renderTrend = () => {
        // Query the DB for all transactions 
        API.getTransactions()
            .then(res => {

                // Define first and last transations of the data set 
                let firstDate = res.data[res.data.length - 1].date;
                let lastDate = res.data[0].date;
                // Define initial sales total for a specific date
                let dayTotal = 0;
                // Define a the first value for the curent day 
                let currentDate = moment(firstDate).format("YYYY/DD/MM");

                // Iterate through each transaction 
                res.data.forEach(trans => {

                    // If the transaction was made a specific day, add it to the total of transactions for that day, then push that total to data1 array
                    if (moment(trans.date).format("YYYY/DD/MM") === currentDate) {
                        dayTotal += trans.transTotal;
                    } else {
                        // Otherwise: 
                        // Update data1
                        if (dayTotal !== 0) this.state.columns[1].push(dayTotal);
                        // Reset dayTotal
                        dayTotal = 0;
                        // Set currentDate to the new date 
                        currentDate = moment(trans.date).format("YYYY/DD/MM");
                        // Update day total with the first transTotal for that day
                        dayTotal += trans.transTotal;

                    }
                    // (if the transaction was made on a date between the first and last transaction) && (the date is even) && (the date does not already exist in the array), then push that (formatted) date to the columns x array 
                    if ((trans.date > firstDate) && (trans.date < lastDate)) {
                        let xTickTest = moment(trans.date).format("DD");
                        let xTick = moment(trans.date).format("YYYY-MM-DD");
                        if ((xTickTest % 2 === 0) && (this.state.columns[0].indexOf(xTick) === -1)) {
                            this.state.columns[0].push(xTick);
                        }
                    }
                })
                console.log("The data is: ", this.state.columns)

                // This seems janky, however the chart wasn't rendering otherwise. Need to reactor the code above to set state there. 
                this.setState({columns: this.state.columns}); 

                // Generate the c3 chart and use the current state to pass data through 
                let chart = c3.generate({
                    // bindto: '#chart',
                    data: {
                        x: 'x',
                        columns: this.state.columns,
                    },
                    axis: {
                        x: {
                            type: 'timeseries',
                            tick: {
                                format: '%m/%d'
                            }
                        }
                    }
                })

            });
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
            .then(res => {
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
                        <Col size="md-12" >
                            <div className="chart">
                                {
                                    this.state.columns[0].length > 1 ?
                                        (
                                            <div>
                                                <h1>History of total transactions by day</h1>
                                                <div id="chart"></div>
                                            </div>
                                        )
                                        :
                                        (<span>{/*Chart will not be render if there is no chart data*/}</span>)
                                }
                            </div>
                        </Col>
                    </Row>
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
                                                <hr />
                                                <ListGroup>
                                                    <ListItem>- Customer: {transaction.customer}</ListItem>
                                                    <ListItem>- Date: {moment(transaction.date).format("MM/DD/YYYY")}</ListItem>
                                                    <ListItem>- Tender Type: {transaction.tenderType}</ListItem>
                                                    <ListItem>- Total: ${transaction.transTotal}</ListItem>
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


// {
//     this.state.columns[0].length > 1 ?
//         (<div id="chart"></div>)
//         :
//         (<span>{/*Chart will not be render if there is no chart data*/}</span>)
// }