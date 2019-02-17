import React, { Component } from 'react';
import axios                from 'axios';

// Utilities
import ScatterBridge      from '../../utils/scatterBridge';
import IOClient           from '../../utils/io-client';
import { updateBalances } from '../../utils/updateBalances';
import { updateCases }    from '../../utils/updateCases';

class Members extends Component {

    constructor(props) {
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
            cases:    [],
            balances: []
        };

        this.toggleLogin  = this.toggleLogin.bind(this);
    }

    toggleLogin() {
        this.setState(prevState => ({
            isLogin: !prevState.isLogin
        }));
    }

    componentDidMount = async() => {
        await this.eosio.connect();
        await this.eosio.login();
        this.toggleLogin();

        this.loadBalances();
        this.loadCases();
        
        /**
         * Arbitration (Member and Arbitrator) Action Listeners
         */

        // Case_Setup Actions

        this.io.onMessage('withdraw',           (balance) => {
            this.setState((prevState) => (
                {
                    balances: updateBalances(prevState, balance)
                } 
            ));
        });

        this.io.onMessage('fileCaseAction',      (postCase) => {
            this.setState((prevState) => (
                {
                    cases: updateCases(prevState, postCase)
                } 
            ));    
        });

        this.io.onMessage('addClaimAction',     (postCase) => {
            this.setState((prevState) => (
                {
                    cases: updateCases(prevState, postCase)
                } 
            ));    
        });

        this.io.onMessage('removeClaimAction',  (postCase) => {
            this.setState((prevState) => (
                {
                    cases: updateCases(prevState, postCase)
                } 
            ));    
        });

        this.io.onMessage('shredCaseAction',    (postCase) => {
            this.setState((prevState) => (
                {
                    cases: updateCases(prevState, postCase)
                } 
            ));    
        });

        this.io.onMessage('readyCaseAction',    (postCase) => {
            this.setState((prevState) => (
                {
                    cases: updateCases(prevState, postCase)
                } 
            ));    
        });
    }

    loadCases = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/case`);
        console.log('LoadCases: ', response);
        this.setState({ cases: response.data.reverse() })
    }

    loadBalances = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/balance`);
        console.log('LoadBalances: ', response);
        this.setState({ balances: response.data.reverse() })
    }

    render() {
        return (
            <div className='MemberContent'>
                <p>Arbitration for members coming soon...</p>
            </div>
        )
    }
}   

export default Members;