import React, { Component } from 'react';
import axios                from 'axios';
import ScatterBridge        from './utils/scatterBridge';
import IOClient             from './utils/io-client';
import './styles/App.css';
import Button               from '@material-ui/core/Button'

class App extends Component {

    state = {
        arbitrators: [],
        cases: [],
        balances: [],
        claims: [],
        // joinedcases: [],
        transfers: []
    }

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
    }

    componentDidMount = async() => {
        this.loadArbitrators();
        this.loadCases();
        this.loadBalances();
        this.loadClaims();
        // this.loadJoinedCases();
        this.loadTransfers();

        // this.io.onMessage('transferAction', (post) => {
        //     this.setState((prevState) => ({  }))
        // })
        
    }

    loadArbitrators = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/arbitrator`);
        console.log('LoadArbitrators: ', response);
        this.setState({ arbitrators: response.data.reverse() })
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

    loadClaims = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/claim`);
        console.log('LoadClaims: ', response);
        this.setState({ claims: response.data.reverse() })
    }

    // loadJoinedCases = async () => {
    //     const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/joinedcases`);
    //     console.log('LoadJoinedCases: ', response);
    //     this.setState({ joinedcases: response.data.reverse() })
    // }

    loadTransfers = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts/transfers`);
        console.log('LoadTransfers: ', response);
        this.setState({ transfers: response.data.reverse() })
    }

    transfer = async () => {
        let actions = await this.eosio.makeAction(process.env.REACT_APP_EOSIO_TOKEN_ACCOUNT, 'transfer', 
            {
              from:      this.eosio.currentAccount.name,
              to:       'emanateissue',
              quantity: '1.0000 EOS',
              memo:     'Transfer Memo'
            }
        );
        let result = await this.eosio.sendTx(actions);
        console.log('Results: ', result);
    }

    handleLogin = async () => {
        await this.eosio.connect();
        await this.eosio.login();
    }

    logout = async () => {
        await this.eosio.logout();
    }

    render() {
        document.title='Telos Portal'
          return (
              <div className='App'>
                  <div className='BtnDiv'>
                      <div className='Btn'>
                          <Button variant='contained' color='primary' onClick={this.handleLogin.bind(this)}>LOGIN</Button>
                      </div>
                      <div className='Btn'>
                          <Button variant='contained' color="primary" onClick={this.transfer.bind(this)}>TRANSFER</Button>
                      </div>
                      <div className='Btn'>
                          <Button variant='contained' color="primary" onClick={this.logout.bind(this)}>LOGOUT</Button>
                      </div>
                  </div>
              </div>
          );
      }
  }

export default App;
