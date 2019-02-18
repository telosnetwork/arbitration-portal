import React, { Component } from 'react';
import axios                from 'axios';

// Utilities
import ScatterBridge      from '../../utils/scatterBridge';
import IOClient           from '../../utils/io-client';
import { updateBalances } from '../../utils/updateBalances';
import { updateCases }    from '../../utils/updateCases';

import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';

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
            activeTab: '1',
            cases:     [],
            balances:  [],
            tabs: {
                withdraw: {
                    name:      'Withdraw',
                    activeTab: '1'
                },
                filecase: {
                    name:      'File Case',
                    activeTab: '2'
                },
                addclaim: {
                    name:      'Add Claim',
                    activeTab: '3'
                },
                removeclaim: {
                    name:      'Remove Claim',
                    activeTab: '4'
                },
                shredcase: {
                    name:      'Shred Case',
                    activeTab: '5'
                },
                readycase: {
                    name:      'Ready Case',
                    activeTab: '6'
                }
            },
            memberForm: {
                withdraw: {

                },
                filecase: {

                },
                addclaim: {

                },
                removeclaim: {

                },
                shredcase: {

                },
                readycase: {
                    
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
            <div className='MemberContent'>
                <p>Arbitration for members coming soon...</p>
                {tabBar}
                {tabContent}
            </div>
        )
    }
}   

export default Members;