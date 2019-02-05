import React, { Component } from 'react';
import './styles/App.css';
import ScatterBridge        from './utils/scatterBridge';
import IOClient             from './utils/io-client';
import Button               from '@material-ui/core/Button'

class App extends Component {

    // state = {

    // }

    constructor (props) {
        super(props);
        this.appName = 'Telos-Portal';
        this.network = {
          blockchain: `eos`,
          protocol:   `https`,
          host:       `api.kylin.alohaeos.com`,
          port:       443,
          chainId:    `5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191`
        };
        console.log(this.network);
        this.eosio = new ScatterBridge(this.network, this.appName);
        // this.io    = new IOClient();
    }

    transfer = async () => {
        let actions = await this.eosio.makeAction('eosio.token', 'transfer', 
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
