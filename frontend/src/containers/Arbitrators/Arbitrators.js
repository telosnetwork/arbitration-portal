import React, { Component }  from 'react';
import axios                 from 'axios';

// Utilities
import ScatterBridge         from '../../utils/scatterBridge';
import IOClient              from '../../utils/io-client';
import { updateArbitrators } from '../../utils/updateArbitrators';
import { updateBalances }    from '../../utils/updateBalances';
import { updateCases }       from '../../utils/updateCases';
import { updateClaims }      from '../../utils/updateClaims';

import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';

class Arbitrators extends Component {

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
            isLogin:     false,
            activeTab:   '1',
            arbitrators: [],
            cases:       [],
            balances:    [],
            claims:      [],
            tabs: {
                respond: {
                    name:      'Respond',
                    activeTab: '1'
                },
                addarbs: {
                    name:      'Add Arbitrators',
                    activeTab: '2'
                },
                assigntocase: {
                    name:      'Assign To Case',
                    activeTab: '3'
                },
                dismissclaim: {
                    name:      'Dismiss Claim',
                    activeTab: '4'
                },
                acceptclaim: {
                    name:      'Accept Claim',
                    activeTab: '5'
                },
                advancecase: {
                    name:      'Advance Case',
                    activeTab: '6'
                },
                dismisscase: {
                    name:      'Dismiss Case',
                    activeTab: '7'
                },
                recuse: {
                    name:      'Recuse',
                    activeTab: '8'
                },
                newarbstatus: {
                    name:      'New Arbitrator Status',
                    activeTab: '9'
                },
                setlangcodes: {
                    name:      'Set Language Codes',
                    activeTab: '10'
                },
                deletecase: {
                    name:      'Delete Case',
                    activeTab: '11'
                }                
            },
            arbitratorForm: {
                respond: {

                },
                addarbs: {

                },
                assigntocase: {

                },
                dismissclaim: {

                },
                acceptclaim: {

                },
                advancecase: {

                },
                dismisscase: {
   
                },
                recuse: {

                },
                newarbstatus: {

                },
                setlangcodes: {

                },
                deletecase: {

                }   
            }
        };

        this.toggleLogin  = this.toggleLogin.bind(this);
        this.toggleTab    = this.toggleTab.bind(this);
    }

    toggleLogin() {
        this.setState(prevState => ({
            isLogin: !prevState.isLogin
        }));
    }

    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    componentDidMount = async() => {
        await this.eosio.connect();
        await this.eosio.login();
        this.toggleLogin();

        this.loadArbitrators();
        this.loadCases();
        this.loadBalances();
        this.loadClaims();

        /**
             * Arbitration (Member and Arbitrator) Action Listeners
         */

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

     deletecase = async() => {
        let actions = await this.eosio.makeAction(process.env.REACT_APP_CONTRACT_ACCOUNT, 'deletecase',
           {
               case_id: ''
           }
       );
       let result = await this.eosio.sendTx(actions);
       console.log('Results: ', result);
     }

    render() {
        const tabElementsArr = [];
        for (let key in this.state.tabs) {
            tabElementsArr.push({
                name:      this.state.tabs[key].name,
                activeTab: this.state.tabs[key].activeTab
            });
        }

        let tabBar = (
            <Nav tabs>
                {tabElementsArr.map(tabElement => (
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === tabElement.activeTab })}
                            onClick={() => { this.toggleTab(tabElement.activeTab) }}>
                            {tabElement.name}
                        </NavLink>
                    </NavItem>
                ))}
            </Nav>
        );

        let tabContent = (
            <TabContent className='tabContent' activeTab={this.state.activeTab}>
                {tabElementsArr.map(tabElement => (
                    <TabPane tabId={tabElement.activeTab}>
                        <Row>
                            <Col sm='12'>
                                <p>{tabElement.name} Tab Content coming soon...</p>
                            </Col>
                        </Row>
                    </TabPane>
                ))}
            </TabContent>
        );

        return (
            <div className='ArbitratorContent'>
                <p>Arbitration for arbitrators coming soon...</p>
                {tabBar}
                {tabContent}
            </div>
        )
    }

}

export default Arbitrators;