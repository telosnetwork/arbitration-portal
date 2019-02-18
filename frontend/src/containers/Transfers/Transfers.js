import React, { Component } from 'react';
import axios                from 'axios';

// Utilities
import ScatterBridge        from '../../utils/scatterBridge';
import IOClient             from '../../utils/io-client';
// import { updateTransfers }  from '../../utils/updateTransfers';
// import { updateBalances }   from '../../utils/updateBalances';

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
        this.io    = new IOClient();

        this.state = {
            isLogin:   false,
            loading:   false,
            balances:  [],
            transfers: [],
            transferForm: {
                from: {
                    label: 'From',
                    value: '',
                    type:  'text',
                    placeholder: 'account_name',
                    text: 'Please input a valid TELOS account name'
                },
                to: {
                    label: 'To',
                    value: '',
                    type:  'text',
                    placeholder: 'account_name',
                    text: 'Please input a valid TELOS account name'
                },
                quantity: {
                    label: 'Quantity',
                    value: '',
                    type:  'number',
                    placeholder: '0',
                    text: 'Please input a valid value'
                },
                memo: {
                    label: 'Memo',
                    value: '',
                    type:  'text',
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

    loadBalances = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/balance`);
        console.log('LoadBalances: ', response);
        this.setState({ balances: response.data.reverse() })
    }

    loadTransfers = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/transfers`);
        console.log('LoadTransfers: ', response);
        this.setState({ transfers: response.data.reverse() })
    }

    /**
     * Transfer Actions
     */
    transfer = async (to, quantity, memo) => {
        const precision = `.0000 EOS`;
        try {
            let actions = await this.eosio.makeAction(process.env.REACT_APP_EOSIO_TOKEN_ACCOUNT, 'transfer', 
                {
                from:      this.eosio.currentAccount.name,
                to:        `${to}`,
                quantity:  `${quantity}${precision}`,
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

        if (this.eosio.isConnected && this.eosio.currentAccount) {
            account = (
                <Input value={this.eosio.currentAccount.name} disabled></Input>
            )
        }

        const formElementsArr = [];
        for (let key in this.state.transferForm) {
            formElementsArr.push({
                id:    key,
                label: this.state.transferForm[key].label,
                value: this.state.transferForm[key].value,
                type:  this.state.transferForm[key].type,
                placeholder: this.state.transferForm[key].placeholder,
                text:  this.state.transferForm[key].text
            });
        }

        let formContent = (
            <Form onSubmit={this.handleSubmit}>
                {formElementsArr.map(formElement => (
                    <FormGroup className='formgroup' row>
                        <Label for={formElement.id} sm={1}>{formElement.label}</Label>
                        <Col sm={11}>
                            {formElement.id === 'from'     ? account : formElement.id === 'quantity' ? null : <Input type={formElement.type} value={formElement.value} placeholder={formElement.placeholder} onChange={(event) => this.inputChangedHandler(event, formElement.id)} /> }
                            {formElement.id === 'quantity' ? <InputGroup>
                                                                <Input type={formElement.type} value={formElement.value} placeholder={formElement.placeholder} onChange={(event) => this.inputChangedHandler(event, formElement.id)} />
                                                                <InputGroupAddon addonType='append'>.0000 EOS</InputGroupAddon>
                                                             </InputGroup> : null }
                            <FormFeedback>...</FormFeedback>
                            <FormText>{formElement.text}</FormText>
                        </Col>
                    </FormGroup>
                ))}
            </Form>
        )
        

        let submission = null;

        if (this.state.loading) {
            submission = <Spinner className='submitSpinner' type='grow' color='primary' />
        } else {
            submission = <Button className='submitButton' color='primary' onClick={this.handleSearch}>Submit</Button>
        }

        return (
            <div className='TransferContent'>
                {formContent}
                {submission}
            </div>
        );
    }

}

export default Transfers;