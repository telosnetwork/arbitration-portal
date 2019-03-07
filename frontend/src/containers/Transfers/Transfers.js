import React, { Component }      from 'react';
import axios                     from 'axios';

// Utilities
import ScatterBridge             from '../../utils/scatterBridge';
// import IOClient                  from '../../utils/io-client';
// import { updateTransfers }       from '../../utils/updateTransfers';
// import { updateBalances }        from '../../utils/updateBalances';

// Components
import BlockConsole              from '../BlockConsole';

// Redux
import { connect }               from 'react-redux';
import { AuthenticationActions } from 'business/actions';
import { AuthenticationSelectors } from 'business/selectors';

// Reactstrap Components
import { InputGroup, InputGroupAddon } from 'reactstrap';
import { Button, Spinner, Col, Form, FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';
import { Jumbotron } from 'reactstrap';

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
            loading:       false,
            consoleoutput: '',
            balances:      [],
            transfers:     [],
            transferForm: {
                from: {
                    label: 'From:',
                    value: '',
                    type:  'text',
                    placeholder: 'account_name',
                    text: 'Please input a valid TELOS account name'
                },
                to: {
                    label: 'To:',
                    value: '',
                    type:  'text',
                    placeholder: 'account_name',
                    text: 'Please input a valid TELOS account name'
                },
                quantity: {
                    label: 'Value:',
                    value: '',
                    type:  'number',
                    placeholder: '0',
                    text: 'Please input a valid value'
                },
                memo: {
                    label: 'Memo:',
                    value: '',
                    type:  'text',
                    placeholder: '...',
                    text: 'Please input a valid memo'
                }
            }
        };

        this.handleSubmit        = this.handleSubmit.bind(this);
        this.handleSearch        = this.handleSearch.bind(this);
        this.inputChangedHandler = this.inputChangedHandler.bind(this);
        this.toggleLogin         = this.toggleLogin.bind(this);

        this.transfer            = this.transfer.bind(this);
    }

    toggleLogin() {
        const { setAuth } = this.props;
        const setaccounts = this.eosio.currentAccount ? this.eosio.currentAccount : null;
        setAuth({ isLogin: !this.props.authentication.isLogin, account: setaccounts });
    }

    handleSubmit = async(event) => {
        event.preventDefault();
        await this.handleSearch(event);
    }

    handleSearch = async(event) => {
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

    // Real-Time Updates via Socket.io
    componentDidMount = async() => {
        await this.eosio.connect();
        await this.eosio.login();
        if (!(this.props.authentication.isLogin || this.props.authentication.account)) {
            if (this.eosio.isConnected && this.eosio.currentAccount) {
                this.toggleLogin();
            }
        }

        this.loadBalances();
        this.loadTransfers();

        // /**
        //  * Transfer Action Listeners
        //  */
        // this.io.onMessage('transferaction', () => {
        //     this.loadBalances();
        //     this.loadTransfers();
        // })

        // /**
        //  * Transfer Action Listeners
        //  */
        // this.io.onMessage('transferaction',     (transfer) => {
        //     this.setState((prevState) => (
        //         {
        //             balances:  updateBalances (prevState, transfer),
        //             transfers: updateTransfers(prevState, transfer)
        //         }
        //     ));
        // });
    }

    loadBalances = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/balance`);
        console.log('LoadBalances: ', response);
        this.setState({ balances: response.data.reverse() });
    }

    loadTransfers = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/transfers`);
        console.log('LoadTransfers: ', response);
        this.setState({ transfers: response.data.reverse() });    
    }

    /**
     * Transfer Actions
     */
    transfer = async (to, quantity, memo) => {
        const precision = `.0000 TLOS`;
        try {
            let actions = await this.eosio.makeAction(process.env.REACT_APP_EOSIO_TOKEN_ACCOUNT, 'transfer', 
                {
                    from:      `${this.props.authentication.account.name}`,
                    to:        `${to}`,
                    quantity:  `${quantity}${precision}`,
                    memo:      `${memo}`
                }
            );
            let result = await this.eosio.sendTx(actions);
            console.log('Results: ', result);
            this.setState({ consoleoutput: result });
            if (result) {
                alert(`Transfer Successful - From: ${this.props.authentication.account.name} To: emanateissue`);
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

        if (this.props.authentication.isLogin && this.props.authentication.account) {
            account = (
                <Input value={this.props.authentication.account.name} disabled></Input>
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
                    <FormGroup className='formgroup' key={formElement.id} row>
                        <Label for={formElement.id} sm={1}>{formElement.label}</Label>
                        <Col sm={11}>
                            {formElement.id === 'from'     ? account : formElement.id === 'quantity' ? null : <Input type={formElement.type} value={formElement.value} placeholder={formElement.placeholder} onChange={(event) => this.inputChangedHandler(event, formElement.id)} disabled={!this.props.authentication.isLogin} /> }
                            {formElement.id === 'quantity' ? <InputGroup>
                                                                <Input type={formElement.type} value={formElement.value} placeholder={formElement.placeholder} onChange={(event) => this.inputChangedHandler(event, formElement.id)} disabled={!this.props.authentication.isLogin} />
                                                                <InputGroupAddon addonType='append'>.0000 TLOS</InputGroupAddon>
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
            submission = <Button className='submitButton' color='primary' onClick={this.handleSearch} disabled={!this.props.authentication.isLogin} >Submit</Button>
        }

        return (
            <div className='TransferContent'>
                <Jumbotron className='jumbo'>
                    {formContent}
                    {submission}
                </Jumbotron>
                <p>Output:</p>
                <BlockConsole consoleoutput={this.state.consoleoutput} />
                <p>Balances:</p>
                <BlockConsole consoleoutput={this.state.balances} />
                <p>Transfers:</p>
                <BlockConsole consoleoutput={this.state.transfers} />
            </div>
        );
    }

}

const mapStateToProps = state => ({
    authentication: {
        isLogin: AuthenticationSelectors.isLogin(state),
        account: AuthenticationSelectors.account(state),
    },
});

// Map the following action to props
const mapDispatchToProps = {
  setAuth: AuthenticationActions.setAuthentication,
};

// Export a redux connected component
export default connect(mapStateToProps, mapDispatchToProps)(Transfers);