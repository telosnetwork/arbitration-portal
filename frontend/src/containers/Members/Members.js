import React, { Component } from 'react';
import axios                from 'axios';

// Utilities
import ScatterBridge      from '../../utils/scatterBridge';
import IOClient           from '../../utils/io-client';
// import { updateBalances } from '../../utils/updateBalances';
// import { updateCases }    from '../../utils/updateCases';

import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { Button, Spinner, Form, FormGroup, Label, CustomInput, Input, FormText, FormFeedback } from 'reactstrap';
import { Jumbotron } from 'reactstrap';

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

        this.languageCodes = {
            ENGL: '0',
            FRCH: '1',
            GRMN: '2',
            KREA: '3',
            JAPN: '4',
            CHNA: '5',
            SPAN: '6',
            PGSE: '7',
            SWED: '8'
        };

        this.state = {
            isLogin:   false,
            loading:   false,
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
                    owner: {
                        label: 'Owner:',
                        value: '',
                        type:  'text',
                        placeholder: 'account_name',
                        text:  'Please input a valid TELOS account name'
                    }
                },
                filecase: {
                    claimant: {
                        label: 'Claimant:',
                        value: '',
                        type:  'text',
                        placeholder: 'account_name',
                        text:  'Please input a valid TELOS account name'
                    },
                    claim_link: {
                        label: 'Claim Link:',
                        value: '',
                        type:  'text',
                        placeholder: 'ipfs_link',
                        text:  'Please input a valid IPFS link'
                    },
                    lang_codes: {
                        label: 'Language Codes:',
                        value: '',
                        type:  'checkbox',
                        placeholder: '',
                        text:  'Please select from the following language codes'
                    },
                    respondant: {
                        label: 'Respondant:',
                        value: '',
                        type:  'text',
                        placeholder: 'account_name',
                        text:  'Please input a valid TELOS account name'
                    }
                },
                addclaim: {
                    case_id: {
                        label: 'Case ID:',
                        value: '',
                        type:  'number',
                        placeholder: '0',
                        text:  'Please input a valid case ID'
                    },
                    claim_link: {
                        label: 'Claim Link:',
                        value: '',
                        type:  'text',
                        placeholder: 'ipfs_link',
                        text:  'Please input a valid IPFS link'
                    },
                    claimant: {
                        label: 'Claimant:',
                        value: '',
                        type:  'text',
                        placeholder: 'account_name',
                        text:  'Please input a valid TELOS account name'
                    },
                },
                removeclaim: {
                    case_id: {
                        label: 'Case ID:',
                        value: '',
                        type:  'number',
                        placeholder: '0',
                        text:  'Please input a valid case ID'
                    },
                    claim_hash: {
                        label: 'Claim Hash:',
                        value: '',
                        type:  'text',
                        placeholder: 'ipfs_link',
                        text:  'Please input a valid IPFS link'
                    },
                    claimant: {
                        label: 'Claimant:',
                        value: '',
                        type:  'text',
                        placeholder: 'account_name',
                        text:  'Please input a valid TELOS account name'
                    },
                },
                shredcase: {
                    case_id: {
                        label: 'Case ID:',
                        value: '',
                        type:  'number',
                        placeholder: '0',
                        text:  'Please input a valid case ID'
                    },
                    claimant: {
                        label: 'Claimant:',
                        value: '',
                        type:  'text',
                        placeholder: 'account_name',
                        text:  'Please input a valid TELOS account name'
                    },
                },
                readycase: {
                    case_id: {
                        label: 'Case ID:',
                        value: '',
                        type:  'number',
                        placeholder: '0',
                        text:  'Please input a valid case ID'
                    },
                    claimant: {
                        label: 'Claimant:',
                        value: '',
                        type:  'text',
                        placeholder: 'account_name',
                        text:  'Please input a valid TELOS account name'
                    },
                }
            }
        };

        this.handleSubmit           = this.handleSubmit.bind(this);
        this.handleSearch           = this.handleSearch.bind(this);
        this.inputChangedHandler    = this.inputChangedHandler.bind(this);
        this.checkBoxChangedHandler = this.checkBoxChangedHandler.bind(this);
        this.toggleLogin            = this.toggleLogin.bind(this);
        this.toggleTab              = this.toggleTab.bind(this);
    }

    handleSubmit = async(event, tab_id) => {
        event.preventDefault();
        await this.handleSearch(event, tab_id);
    }

    handleSearch = async(event, tab_id) => {
        event.preventDefault();
        this.setState({ loading: true });
        const formData = {};
        for (let formElementIdentifier in this.state.memberForm[tab_id]) {
            formData[formElementIdentifier] = this.state.memberForm[tab_id][formElementIdentifier].value;
        }
        // Send Action to Respective Action Handler
        switch (tab_id) {
            case 'withdraw':
                await this.withdraw(formData.owner);
                break;
            case 'filecase':
                await this.filecase(formData.claimant, formData.claim_link, formData.lang_codes, formData.respondant);
                break;
            case 'addclaim':
                await this.addclaim(formData.case_id, formData.claim_link, formData.claimant);
                break;
            case 'removeclaim':
                await this.removeclaim(formData.case_id, formData.claim_hash, formData.claimant);
                break;
            case 'shredcase':
                await this.shredcase(formData.case_id, formData.claimant);
                break;
            case 'readycase':
                await this.readycase(formData.case_id, formData.claimant);
                break;
            default:
                alert('No Available Member Action...!');
        }
    }

    inputChangedHandler = (event, tab_id, element_id) => {
        const updatedForm = {
            ...this.state.memberForm
        };
        const updatedFormTab = {
            ...updatedForm[tab_id]
        };
        const updatedFormElement = {
            ...updatedFormTab[element_id]
        };

        updatedFormElement.value   = event.target.value;
        updatedFormTab[element_id] = updatedFormElement;
        updatedForm[tab_id]        = updatedFormTab;

        this.setState({ memberForm: updatedForm });
    }

    checkBoxChangedHandler = (tab_id, element_id, language) => {
        
        let updatedLanguages = [];

        const updatedForm = {
            ...this.state.memberForm
        };
        const updatedFormTab = {
            ...updatedForm[tab_id]
        };
        const updatedFormElement = {
            ...updatedFormTab[element_id]
        };

        updatedLanguages = [...updatedFormElement.value];

        if (!updatedLanguages.includes(this.languageCodes[language])) {
            updatedLanguages.push(this.languageCodes[language]);
        }  else {
            let index = updatedLanguages.indexOf(this.languageCodes[language]);
            updatedLanguages.splice(index, 1);
        }
        
        updatedFormElement.value   = updatedLanguages;
        updatedFormTab[element_id] = updatedFormElement;
        updatedForm[tab_id]        = updatedFormTab;

        this.setState({ memberForm: updatedForm });
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
        if (this.eosio.isConnected && this.eosio.currentAccount) {
            this.toggleLogin();
        }
        // this.loadBalances();
        // this.loadCases();
        
        // /**
        //  * Arbitration (Member and Arbitrator) Action Listeners
        //  */

        // // Case_Setup Actions

        // this.io.onMessage('withdraw',           (balance) => {
        //     this.setState((prevState) => (
        //         {
        //             balances: updateBalances(prevState, balance)
        //         } 
        //     ));
        // });

        // this.io.onMessage('fileCaseAction',      (postCase) => {
        //     this.setState((prevState) => (
        //         {
        //             cases: updateCases(prevState, postCase)
        //         } 
        //     ));    
        // });

        // this.io.onMessage('addClaimAction',     (postCase) => {
        //     this.setState((prevState) => (
        //         {
        //             cases: updateCases(prevState, postCase)
        //         } 
        //     ));    
        // });

        // this.io.onMessage('removeClaimAction',  (postCase) => {
        //     this.setState((prevState) => (
        //         {
        //             cases: updateCases(prevState, postCase)
        //         } 
        //     ));    
        // });

        // this.io.onMessage('shredCaseAction',    (postCase) => {
        //     this.setState((prevState) => (
        //         {
        //             cases: updateCases(prevState, postCase)
        //         } 
        //     ));    
        // });

        // this.io.onMessage('readyCaseAction',    (postCase) => {
        //     this.setState((prevState) => (
        //         {
        //             cases: updateCases(prevState, postCase)
        //         } 
        //     ));    
        // });
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

    withdraw = async(owner) => {
        try {
            let actions = await this.eosio.makeAction(process.env.REACT_APP_CONTRACT_ACCOUNT, 'withdraw',
                {
                    owner: `${owner}`
                }
            );
            let result = await this.eosio.sendTx(actions);
            console.log('Results: ', result);
            if (result) {
                alert(`Withdraw Successful`);
            } else {
                alert(`Withdraw Unsuccessful`);
            }     
        } catch (err) {
            console.error(err);
        }
        this.setState({ loading: false });
    }

    filecase = async(claimant, claim_link, lang_codes, respondant) => {
        try {
            let actions = await this.eosio.makeAction(process.env.REACT_APP_CONTRACT_ACCOUNT, 'filecase',
                {
                    claimant:   `${claimant}`,
                    claim_link: `${claim_link}`,
                    lang_codes: `${lang_codes}`,
                    respondant: `${respondant}`
                }
            );
            let result = await this.eosio.sendTx(actions);
            console.log('Results: ', result);
            if (result) {
                alert(`File Case Successful`);
            } else {
                alert(`File Case Unsuccessful`);
            }     
        } catch (err) {
            console.error(err);
        }
        this.setState({ loading: false });
    }

    addclaim = async(case_id, claim_link, claimant) => {
        try {
            let actions = await this.eosio.makeAction(process.env.REACT_APP_CONTRACT_ACCOUNT, 'addclaim',
                {
                    case_id:    `${case_id}`,
                    claim_link: `${claim_link}`,
                    claimant:   `${claimant}`
                }
            );
            let result = await this.eosio.sendTx(actions);
            console.log('Results: ', result);
            if (result) {
                alert(`Add Claim Successful`);
            } else {
                alert(`Add Claim Unsuccessful`);
            }     
        } catch (err) {
            console.error(err);
        }
        this.setState({ loading: false });
    }

    removeclaim = async(case_id, claim_hash, claimant) => {
        try {
            let actions = await this.eosio.makeAction(process.env.REACT_APP_CONTRACT_ACCOUNT, 'removeclaim',
                {
                    case_id:    `${case_id}`,
                    claim_hash: `${claim_hash}`,
                    claimant:   `${claimant}`
                }
            );
            let result = await this.eosio.sendTx(actions);
            console.log('Results: ', result);
            if (result) {
                alert(`Remove Claim Successful`);
            } else {
                alert(`Remove Claim Unsuccessful`);
            }          
        } catch (err) {
            console.error(err);
        }
        this.setState({ loading: false });
    }

    shredcase = async(case_id, claimant) => {
        try {
            let actions = await this.eosio.makeAction(process.env.REACT_APP_CONTRACT_ACCOUNT, 'shredcase',
                {
                    case_id:  `${case_id}`,
                    claimant: `${claimant}`
                }
            );
            let result = await this.eosio.sendTx(actions);
            console.log('Results: ', result);
            if (result) {
                alert(`Shred Case Successful`);
            } else {
                alert(`Shred Case Unsuccessful`);
            }
        } catch (err) {
            console.error(err);
        }
        this.setState({ loading: false });
    }

    readycase = async(case_id, claimant) => {
        try {
            let actions = await this.eosio.makeAction(process.env.REACT_APP_CONTRACT_ACCOUNT, 'readycase',
                {
                    case_id:  `${case_id}`,
                    claimant: `${claimant}`
                }
            );
            let result = await this.eosio.sendTx(actions);
            console.log('Results: ', result);
            if (result) {
                alert(`Ready Case Successful`);
            } else {
                alert(`Ready Case Unsuccessful`);
            }
        } catch (err) {
            console.error(err);
        }
        this.setState({ loading: false });
    }

    render() {
        const tabElementsArr = [];
        for (let key in this.state.tabs) {
            tabElementsArr.push({
                id:        key,
                name:      this.state.tabs[key].name,
                activeTab: this.state.tabs[key].activeTab
            });
        }

        /**
         * Member Actions Form Builder
         */
        const withdrawFormArr = [];
        for (let key in this.state.memberForm.withdraw) {
            withdrawFormArr.push({
                id:    key,
                label: this.state.memberForm.withdraw[key].label,
                value: this.state.memberForm.withdraw[key].value,
                type:  this.state.memberForm.withdraw[key].type,
                placeholder: this.state.memberForm.withdraw[key].placeholder,
                text:  this.state.memberForm.withdraw[key].text
            });
        }

        const fileCaseArr = [];
        for (let key in this.state.memberForm.filecase) {
            fileCaseArr.push({
                id:    key,
                label: this.state.memberForm.filecase[key].label,
                value: this.state.memberForm.filecase[key].value,
                type:  this.state.memberForm.filecase[key].type,
                placeholder: this.state.memberForm.filecase[key].placeholder,
                text:  this.state.memberForm.filecase[key].text
            });
        }


        const addClaimArr = [];
        for (let key in this.state.memberForm.addclaim) {
            addClaimArr.push({
                id:    key,
                label: this.state.memberForm.addclaim[key].label,
                value: this.state.memberForm.addclaim[key].value,
                type:  this.state.memberForm.addclaim[key].type,
                placeholder: this.state.memberForm.addclaim[key].placeholder,
                text:  this.state.memberForm.addclaim[key].text
            });
        }

        
        const removeClaimArr = [];
        for (let key in this.state.memberForm.removeclaim) {
            removeClaimArr.push({
                id:    key,
                label: this.state.memberForm.removeclaim[key].label,
                value: this.state.memberForm.removeclaim[key].value,
                type:  this.state.memberForm.removeclaim[key].type,
                placeholder: this.state.memberForm.removeclaim[key].placeholder,
                text:  this.state.memberForm.removeclaim[key].text
            });
        }

        const shredCaseArr = [];
        for (let key in this.state.memberForm.shredcase) {
            shredCaseArr.push({
                id:    key,
                label: this.state.memberForm.shredcase[key].label,
                value: this.state.memberForm.shredcase[key].value,
                type:  this.state.memberForm.shredcase[key].type,
                placeholder: this.state.memberForm.shredcase[key].placeholder,
                text:  this.state.memberForm.shredcase[key].text
            });
        }

        const readyCaseArr = [];
        for (let key in this.state.memberForm.readycase) {
            readyCaseArr.push({
                id:    key,
                label: this.state.memberForm.readycase[key].label,
                value: this.state.memberForm.readycase[key].value,
                type:  this.state.memberForm.readycase[key].type,
                placeholder: this.state.memberForm.readycase[key].placeholder,
                text:  this.state.memberForm.readycase[key].text
            });
        }

        const languages = ['ENGL', 'FRCH', 'GRMN', 'KREA', 'JAPN', 'CHNA', 'SPAN', 'PGSE', 'SWED'];

        let tabBar = (
            <Nav tabs>
                {tabElementsArr.map(tabElement => (
                    <NavItem key={tabElement.name}>
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
                    <TabPane tabId={tabElement.activeTab} key={tabElement.activeTab}>
                        <Row>
                            <Col sm='12'>
                                {tabElement.id === 'withdraw' ? 
                                    <Form onSubmit={(event) => this.handleSubmit(event, tabElement.id)}>
                                        {withdrawFormArr.map(formElement => (
                                            <FormGroup className='formgroup' key={formElement.id} row>
                                                <Label for={formElement.id} sm={2}>{formElement.label}</Label>
                                                <Col sm={10}>
                                                    <Input type={formElement.type} value={formElement.value} placeholder={formElement.placeholder} onChange={(event) => this.inputChangedHandler(event, tabElement.id, formElement.id)} />
                                                    <FormFeedback>...</FormFeedback>
                                                    <FormText>{formElement.text}</FormText>
                                                </Col>
                                            </FormGroup>
                                        ))}
                                    </Form> : null}
                                {tabElement.id === 'filecase' ? 
                                    <Form onSubmit={(event) => this.handleSubmit(event, tabElement.id)}>
                                        {fileCaseArr.map(formElement => (
                                            <FormGroup className='formgroup' key={formElement.id} row>
                                                <Label for={formElement.id} sm={2}>{formElement.label}</Label>
                                                <Col sm={10}>
                                                    {formElement.id === 'lang_codes' ? 
                                                        languages.map(language => (
                                                            <CustomInput className='checkboxClass' key={language} name={formElement.id} type={formElement.type} id={language} label={language} onClick={() => this.checkBoxChangedHandler(tabElement.id, formElement.id, language)} />
                                                        ))
                                                    : null }
                                                    {formElement.id !== 'lang_codes' ? 
                                                        <Input type={formElement.type} value={formElement.value} placeholder={formElement.placeholder} onChange={(event) => this.inputChangedHandler(event, tabElement.id, formElement.id)} />
                                                    : null}
                                                    <FormFeedback>...</FormFeedback>
                                                    <FormText>{formElement.text}</FormText>
                                                </Col>
                                            </FormGroup>
                                        ))}
                                    </Form> : null}
                                {tabElement.id === 'addclaim' ? 
                                    <Form onSubmit={(event) => this.handleSubmit(event, tabElement.id)}>
                                        {addClaimArr.map(formElement => (
                                            <FormGroup className='formgroup' key={formElement.id} row>
                                                <Label for={formElement.id} sm={2}>{formElement.label}</Label>
                                                <Col sm={10}>
                                                    <Input type={formElement.type} value={formElement.value} placeholder={formElement.placeholder} onChange={(event) => this.inputChangedHandler(event, tabElement.id, formElement.id)} />
                                                    <FormFeedback>...</FormFeedback>
                                                    <FormText>{formElement.text}</FormText>
                                                </Col>
                                            </FormGroup>
                                        ))}
                                    </Form> : null}
                                {tabElement.id === 'removeclaim' ? 
                                    <Form onSubmit={(event) => this.handleSubmit(event, tabElement.id)}>
                                        {removeClaimArr.map(formElement => (
                                            <FormGroup className='formgroup' key={formElement.id} row>
                                                <Label for={formElement.id} sm={2}>{formElement.label}</Label>
                                                <Col sm={10}>
                                                    <Input type={formElement.type} value={formElement.value} placeholder={formElement.placeholder} onChange={(event) => this.inputChangedHandler(event, tabElement.id, formElement.id)} />
                                                    <FormFeedback>...</FormFeedback>
                                                    <FormText>{formElement.text}</FormText>
                                                </Col>
                                            </FormGroup>
                                        ))}
                                    </Form> : null}
                                {tabElement.id === 'shredcase' ? 
                                    <Form onSubmit={(event) => this.handleSubmit(event, tabElement.id)}>
                                        {shredCaseArr.map(formElement => (
                                            <FormGroup className='formgroup' key={formElement.id} row>
                                                <Label for={formElement.id} sm={2}>{formElement.label}</Label>
                                                <Col sm={10}>
                                                    <Input type={formElement.type} value={formElement.value} placeholder={formElement.placeholder} onChange={(event) => this.inputChangedHandler(event, tabElement.id, formElement.id)} />
                                                    <FormFeedback>...</FormFeedback>
                                                    <FormText>{formElement.text}</FormText>
                                                </Col>
                                            </FormGroup>
                                        ))}
                                    </Form> : null}
                                {tabElement.id === 'readycase' ? 
                                    <Form onSubmit={(event) => this.handleSubmit(event, tabElement.id)}>
                                        {readyCaseArr.map(formElement => (
                                            <FormGroup className='formgroup' key={formElement.id} row>
                                                <Label for={formElement.id} sm={2}>{formElement.label}</Label>
                                                <Col sm={10}>
                                                    <Input type={formElement.type} value={formElement.value} placeholder={formElement.placeholder} onChange={(event) => this.inputChangedHandler(event, tabElement.id, formElement.id)} />
                                                    <FormFeedback>...</FormFeedback>
                                                    <FormText>{formElement.text}</FormText>
                                                </Col>
                                            </FormGroup>
                                        ))}
                                    </Form> : null}
                                {this.state.loading ? 
                                    <Spinner className='submitSpinner' type='grow' color='primary' /> : 
                                    <Button className='submitButton' color='primary' onClick={(event) => this.handleSearch(event, tabElement.id)}>Submit</Button> }
                            </Col>
                        </Row>
                    </TabPane>
                ))}
            </TabContent>
        );

        return (
            <div className='MemberContent'>
                <p>Arbitration for members coming soon...</p>
                <Jumbotron>
                    {tabBar}
                    {tabContent}
                </Jumbotron>
            </div>
        )
    }
}   

export default Members;