import React, { Component } from 'react';
import axios                from 'axios';
import ScatterBridge        from './utils/scatterBridge';
import IOClient             from './utils/io-client';

import { updateTransfers }   from './utils/updateTransfers';
import { updateArbitrators } from './utils/updateArbitrators';
import { updateBalances }    from './utils/updateBalances';
import { updateCases }       from './utils/updateCases';
import { updateClaims }      from './utils/updateClaims';
// import { updateJoinedCases } from './utils/updateJoinedCases';

import { connect } from 'react-redux';
import { ArbitratorsAction,
         BalancesAction,
         CasesAction,
         ClaimsAction,
        //  JoinedCasesAction,
         TransfersAction } from 'actions';

import './styles/App.css';
import { Button } from 'reactstrap';

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

    // Real-Time Updates via Socket.io
    componentDidMount = async() => {
        this.loadArbitrators();
        this.loadCases();
        this.loadBalances();
        this.loadClaims();
        // this.loadJoinedCases();
        this.loadTransfers();

        /**
         * Transfer Action Listeners
         */
        this.io.onMessage('transferAction',     (transfer) => {
            this.setState((prevState) => (
                {
                    balances:  updateBalances(prevState, transfer),
                    transfers: updateTransfers(prevState, transfer)
                }
            ));
        });

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

        // Case_Progression Actions

        this.io.onMessage('respondAction',      (postCase) => {
            this.setState((prevState) => (
                {
                    cases: updateCases(prevState, postCase)
                }
            ));
        });

        this.io.onMessage('addArbsAction',      (post) => {
        });

        this.io.onMessage('assignToCaseAction', (post) => {
            this.setState((prevState) => (
                {
                    arbitrators: updateArbitrators(prevState, post),
                    cases:       updateCases(prevState, post) 
                } 
            ));  
        });

        this.io.onMessage('dismissClaimAction', (postCase) => {
            this.setState((prevState) => (
                {
                    cases: updateCases(prevState, postCase)
                } 
            ));  
        });

        this.io.onMessage('acceptClaimAction',  (post) => {
            this.setState((prevState) => (
                {
                    cases:  updateCases(prevState, post),
                    claims: updateClaims(prevState, post)
                } 
            ));  
        });

        this.io.onMessage('advanceCaseAction',  (postCase) => {
            this.setState((prevState) => (
                {
                    cases: updateCases(prevState, postCase)
                } 
            ));  
        });

        this.io.onMessage('dismissCaseAction',  (postCase) => {
            this.setState((prevState) => (
                {
                    cases: updateCases(prevState, postCase)
                } 
            ));  
        });

        this.io.onMessage('recuseAction',       (postCase) => {
            this.setState((prevState) => (
                {
                    cases: updateCases(prevState, postCase)
                } 
            ));  
        });

        // Arb_Actions
        
        this.io.onMessage('newArbStatusAction', (arbitrator) => {
            this.setState((prevState) => (
                {
                    arbitrators: updateArbitrators(prevState, arbitrator)
                } 
            ));    
        });

        this.io.onMessage('setLangCodesAction', (arbitrator) => {
            this.setState((prevState) => (
                {
                    arbitrators: updateArbitrators(prevState, arbitrator)
                } 
            )); 
        });

        this.io.onMessage('deleteCaseAction',   (postCase) => {
            this.setState((prevState) => (
                {
                    cases: updateCases(prevState, postCase)
                }
            ));
        });
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

    /**
     * Transfer Actions
     */
    transfer = async () => {
        try {
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
        } catch (err) {
            console.error(err);
        }
    }

    /**
     * Case_Setup Actions
     */
    withdraw = async() => {
        let actions = await this.eosio.makeAction(process.env.REACT_APP_CONTRACT_ACCOUNT, 'withdraw',
            {
                owner: ''
            }
        );
        let result = await this.eosio.sendTx(actions);
        console.log('Results: ', result);
    }

    filecase = async() => {
        let actions = await this.eosio.makeAction(process.env.REACT_APP_CONTRACT_ACCOUNT, 'filecase',
            {
                claimant:   '',
                claim_link: '',
                lang_codes: '',
                respondant: ''
            }
        );
        let result = await this.eosio.sendTx(actions);
        console.log('Results: ', result);
    }

    addclaim = async() => {
        let actions = await this.eosio.makeAction(process.env.REACT_APP_CONTRACT_ACCOUNT, 'addclaim',
            {
                case_id:    '',
                claim_link: '',
                claimant:   ''
            }
        );
        let result = await this.eosio.sendTx(actions);
        console.log('Results: ', result);
    }

    removeclaim = async() => {
        let actions = await this.eosio.makeAction(process.env.REACT_APP_CONTRACT_ACCOUNT, 'removeclaim',
            {
                case_id:    '',
                claim_hash: '',
                claimant:   ''
            }
        );
        let result = await this.eosio.sendTx(actions);
        console.log('Results: ', result);
    }

    shredcase = async() => {
        let actions = await this.eosio.makeAction(process.env.REACT_APP_CONTRACT_ACCOUNT, 'shredcase',
            {
                case_id:  '',
                claimant: ''
            }
        );
        let result = await this.eosio.sendTx(actions);
        console.log('Results: ', result);
    }

    readycase = async() => {
        let actions = await this.eosio.makeAction(process.env.REACT_APP_CONTRACT_ACCOUNT, 'readycase',
            {
                case_id:  '',
                claimant: ''
            }
        );
        let result = await this.eosio.sendTx(actions);
        console.log('Results: ', result);
    }

    /**
     * Case_Progression Actions
     */

     respond = async() => {
        let actions = await this.eosio.makeAction(process.env.REACT_APP_CONTRACT_ACCOUNT, 'respond',
            {
                case_id:       '',
                claim_hash:    '',
                respondant:    '',
                response_link: ''
            }
        );
        let result = await this.eosio.sendTx(actions);
        console.log('Results: ', result);
     }

     addarbs = async() => {
        let actions = await this.eosio.makeAction(process.env.REACT_APP_CONTRACT_ACCOUNT, 'addarbs',
            {
                case_id:            '',
                assigned_arb:       '',
                num_arbs_to_assign: ''
            }
        );
        let result = await this.eosio.sendTx(actions);
        console.log('Results: ', result);
     }

     assigntocase = async() => {
         let actions = await this.eosio.makeAction(process.env.REACT_APP_CONTRACT_ACCOUNT, 'assigntocase',
            {
                case_id:       '',
                arb_to_assign: ''
            }
        );
        let result = await this.eosio.sendTx(actions);
        console.log('Results: ', result);
     }

     dismissclaim = async() => {
        let actions = await this.eosio.makeAction(process.env.REACT_APP_CONTRACT_ACCOUNT, 'dismissclaim',
            {
                case_id:      '',
                assigned_arb: '',
                claim_hash:   '',
                memo:         ''
            }
        );
        let result = await this.eosio.sendTx(actions);
        console.log('Results: ', result);
     }

     acceptclaim = async() => {
        let actions = await this.eosio.makeAction(process.env.REACT_APP_CONTRACT_ACCOUNT, 'acceptclaim',
            {
                case_id:        '',
                assigned_arb:   '',
                claim_hash:     '',
                decision_link:  '',
                decision_class: ''
            }
        );
        let result = await this.eosio.sendTx(actions);
        console.log('Results: ', result);
     }

     advancecase = async() => {
        let actions = await this.eosio.makeAction(process.env.REACT_APP_CONTRACT_ACCOUNT, 'advancecase',
            {
                case_id:      '',
                assigned_arb: '',
            }
        );
        let result = await this.eosio.sendTx(actions);
        console.log('Results: ', result);
     }

     dismisscase = async() => {
        let actions = await this.eosio.makeAction(process.env.REACT_APP_CONTRACT_ACCOUNT, 'dismisscase',
            {
                case_id:      '',
                assigned_arb: '',
                ruling_link:  '',
            }
        );
        let result = await this.eosio.sendTx(actions);
        console.log('Results: ', result);
     }

     recuse = async() => {
         let actions = await this.eosio.sendTx(process.env.REACT_APP_CONTRACT_ACCOUNT, 'recuse',
            {
                case_id:      '',
                rationale:    '',
                assigned_arb: ''
            }
        );
        let result = await this.eosio.sendTx(actions);
        console.log('Results: ', result);
     }

    /**
     * Arb_Actions 
     */

     newarbstatus = async() => {
         let actions = await this.eosio.makeAction(process.env.REACT_APP_CONTRACT_ACCOUNT, 'newarbstatus',
            {
                new_status: '',
                arbitrator: ''
            }
        );
        let result = await this.eosio.sendTx(actions);
        console.log('Results: ', result);
     }

     setlangcodes = async() => {
         let actions = await this.eosio.makeAction(process.env.REACT_APP_CONTRACT_ACCOUNT, 'setlangcodes',
            {
                arbitrator: '',
                lang_codes: ''
            }
        );
        let result = await this.eosio.sendTx(actions);
        console.log('Results: ', result);
     }

     deltecase = async() => {
        let actions = await this.eosio.makeAction(process.env.REACT_APP_CONTRACT_ACCOUNT, 'deletecase',
           {
               case_id: ''
           }
       );
       let result = await this.eosio.sendTx(actions);
       console.log('Results: ', result);
     }
    
    /**
     * Scatter Bridge
     */

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
                            <Button variant='contained' color='primary' onClick={this.transfer.bind(this)}>TRANSFER</Button>
                      </div>
                      <div className='Btn'>
                            <Button variant='contained' color='danger' onClick={this.logout.bind(this)}>LOGOUT</Button>
                      </div>
                  </div>
              </div>
          );
      }
  }

// export default App;

// Map all state to component props (for redux to connect)
const mapStateToProps = state => state;

// Map the following actio to component props
const mapDispatchToProps = {
    setArbitrators: ArbitratorsAction.setArbitrators,
    setBalances:    BalancesAction.setBalances,
    setCases:       CasesAction.setCases,
    setClaims:      ClaimsAction.setClaims,
    // setJoinedCasesAction: JoinedCasesAction.setJoinedCasesAction,
    setTransfers:   TransfersAction.setTransfers
};

// Export a redux connected component
export default connect(mapStateToProps, mapDispatchToProps)(App);