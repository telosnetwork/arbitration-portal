import React, { Component } from 'react';
import axios                from 'axios';

// Utilities
import ScatterBridge        from '../../utils/scatterBridge';
import IOClient             from '../../utils/io-client';
import { updateTransfers }  from '../../utils/updateTransfers';
import { updateBalances }   from '../../utils/updateBalances';

// Reactstrap Components
import { InputGroup, InputGroupAddon } from 'reactstrap';
import { Button, Spinner, Col, Form, FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';

class Transfers extends Component {

    constructor (props) {
        super(props);
        
        this.appName = process.env.REACT_APP_NAME;
        this.network = {
          blockchain: `${process.env.REACT_APP_BLOCKCHAIN}`,
          protocol:   `${process.env.REACT_APP_PROTOCOL}`,
          host:       `${process.env.REACT_APP_HOST}`,
          port:       `${process.env.REACT_APP_PORT}`,
          chainId:    `${process.env.REACT_APP_CHAINID}`
        };
        this.eosio = new ScatterBridge(this.network, this.appName);
        // this.io    = new IOClient();

        this.state = {
            isLogin:   false,
            loading:   false,
            balances:  [],
            transfers: [],
            transferForm: {
                from: {
                    id: 'from',
                    value: '',
                    placeholder: 'account_name',
                    text: 'Please input a valid TELOS account name'
                },
                to: {
                    id: 'to',
                    value: '',
                    placeholder: 'account_name',
                    text: 'Please input a valid TELOS account name'
                },
                quantity: {
                    id: 'quantity',
                    value: '',
                    placeholder: '0',
                    text: 'Please input a valid value'
                },
                memo: {
                    id: 'memo',
                    value: '',
                    placeholder: '...',
                    text: 'Please input a valid memo'
                }
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.toggleLogin  = this.toggleLogin.bind(this);

        this.transfer     = this.transfer.bind(this);
    }

    handleSubmit = async(event) => {
        event.preventDefault();
        await this.handleSearch(event);
    }

    handleSearch = async(event) =>{
        event.preventDefault();
        this.setState({ loading: true });
        const formData = {};
        for (let formElementIdentifier in this.state.transferForm) {
            formData[formElementIdentifier] = this.state.transferForm[formElementIdentifier].value;
        }
        await this.transfer(formData.to, formData.quantity, formData.memo);
    } 

    inputChangedHandler = (event, id) => {
        const updatedForm = {
            ...this.state.transferForm
        };
        const updatedFormElement = {
            ...updatedForm[id]
        };

        updatedFormElement.value = event.target.value;
        updatedForm[id]          = updatedFormElement;

        this.setState({ transferForm: updatedForm });
    }

    toggleLogin() {
        this.setState(prevState => ({
            isLogin: !prevState.isLogin
        }));
    }

    // Real-Time Updates via Socket.io
    componentDidMount = async() => {
        await this.eosio.connect();
        await this.eosio.login();
        this.toggleLogin();

        // this.loadBalances();
        // this.loadTransfers();

        // /**
        //  * Transfer Action Listeners
        //  */
        // this.io.onMessage('transferAction',     (transfer) => {
        //     this.setState((prevState) => (
        //         {
        //             balances:  updateBalances(prevState, transfer),
        //             transfers: updateTransfers(prevState, transfer)
        //         }
        //     ));
        // });
    }

    // loadBalances = async () => {
    //     const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/balance`);
    //     console.log('LoadBalances: ', response);
    //     this.setState({ balances: response.data.reverse() })
    // }

    // loadTransfers = async () => {
    //     const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/transfers`);
    //     console.log('LoadTransfers: ', response);
    //     this.setState({ transfers: response.data.reverse() })
    // }

    /**
     * Transfer Actions
     */
    transfer = async (to, quantity, memo) => {
        try {
            let actions = await this.eosio.makeAction(process.env.REACT_APP_EOSIO_TOKEN_ACCOUNT, 'transfer', 
                {
                from:      this.eosio.currentAccount.name,
                to:        `${to}`,
                quantity:  `${quantity}` + `.0000 EOS`,
                memo:      `${memo}`
                }
            );
            let result = await this.eosio.sendTx(actions);
        console.log('Results: ', result);
        if (result) {
            alert(`Transfer Successful - From: ${this.eosio.currentAccount.name} To: emanateissue`);
        } else {
            alert(`Transfer Unsuccessful`);
        }
        } catch (err) {
            console.error(err);
        }
        this.setState({ loading: false });
    }

    render() {
        let account = (
            <Input disabled></Input>
        );

        if (this.eosio.currentAccount) {
            account = (
                <Input value={this.eosio.currentAccount.name} disabled></Input>
            )
        }

        let submission = null;

        if (this.state.loading) {
            submission = <Spinner className='submitSpinner' color='primary' />
        } else {
            submission = <Button className='submitButton' color='primary' onClick={this.handleSearch}>Submit</Button>
        }
        
        return (
            <div className='TransferContent'>
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup className='formgroup' row>
                        <Label for={this.state.transferForm.from.id} sm={1}>From:</Label>
                        <Col sm={11}>
                            {account}
                            <FormFeedback>...</FormFeedback>
                            <FormText>{this.state.transferForm.from.text}</FormText>
                        </Col>
                    </FormGroup>
                    <FormGroup className='formgroup' row>
                        <Label for={this.state.transferForm.to.id} sm={1}>To:</Label>
                        <Col sm={11}>
                            <Input value={this.state.transferForm.to.value} placeholder={this.state.transferForm.to.placeholder} onChange={(event) => this.inputChangedHandler(event, this.state.transferForm.to.id)} />
                            <FormFeedback>...</FormFeedback>
                            <FormText>{this.state.transferForm.to.text}</FormText>
                        </Col>
                    </FormGroup>
                    <FormGroup className='formgroup' row>
                        <Label for={this.state.transferForm.quantity.id} sm={1}>Quantity:</Label>
                        <Col sm={11}>
                            <InputGroup>
                                <Input type='number' step='1' value={this.state.transferForm.quantity.value} placeholder={this.state.transferForm.quantity.placeholder} onChange={(event) => this.inputChangedHandler(event, this.state.transferForm.quantity.id)} />
                                <InputGroupAddon addonType='append'>.0000 EOS</InputGroupAddon>
                            </InputGroup>
                            <FormFeedback>...</FormFeedback>
                            <FormText>{this.state.transferForm.quantity.text}</FormText>
                        </Col>
                    </FormGroup>
                    <FormGroup className='formgroup' row>
                        <Label for={this.state.transferForm.memo.id} sm={1}>Memo:</Label>
                        <Col sm={11}>
                            <Input value={this.state.transferForm.memo.value} placeholder={this.state.transferForm.memo.placeholder} onChange={(event) => this.inputChangedHandler(event, this.state.transferForm.memo.id)} />
                            <FormFeedback>...</FormFeedback>
                            <FormText>{this.state.transferForm.memo.text}</FormText>
                        </Col>
                    </FormGroup>
                    {submission}
                </Form> 
            </div>
        );
    }

}

export default Transfers;