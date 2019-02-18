import React, { Component }    from 'react';
import { Route, Link, Switch } from 'react-router-dom';

// Utilities
import ScatterBridge from '../utils/scatterBridge';

// Components
import Transfers     from '../containers/Transfers';
import Arbitrators   from '../containers/Arbitrators';
import Members       from '../containers/Members';

// Resources
import mainLogo      from '../resources/telosLogo.png'

// Reactstrap Components
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';

class App extends Component {

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

        this.state = {
            isLogin: false,
            modal:   false,
            isOpen:  false
        };

        this.toggleModal  = this.toggleModal.bind(this);
        this.toggleNavBar = this.toggleNavBar.bind(this);
        this.handleLogin  = this.handleLogin.bind(this);
        this.toggleLogin  = this.toggleLogin.bind(this);

        this.logout       = this.logout.bind(this);
    }

    toggleModal() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    toggleNavBar() {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }));
    }

    toggleLogin() {
        this.setState(prevState => ({
            isLogin: !prevState.isLogin
        }));
    }

    /**
     * Scatter Bridge
     */

    handleLogin = async () => {
        await this.eosio.connect();
        await this.eosio.login();
        if (this.eosio.isConnected && this.eosio.currentAccount) {
            this.toggleLogin();
        }
        this.toggleModal();
    }

    logout = async () => {
        await this.eosio.logout();
        if (!this.eosio.isConnected) {
            this.toggleLogin();
        }
        this.toggleModal();
    }

    render() {
        document.title='Telos Portal'
          return (
              <div className='App'>
                <Navbar color='light' light expand='md'>
                    <Link to='/' style={{ color: 'black', textDecoration: 'none' }}>
                        <img src={mainLogo} alt='mainLogo' height="40" width="40"/> Arbitration Portal
                    </Link>
                    <NavbarToggler onClick={this.toggleNavBar}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className='ml-auto' navbar>
                            <NavItem>
                                <Link to='/arbitrators' style={ !this.state.isLogin ? {pointerEvents: 'none', color: 'black', textDecoration: 'none', marginRight: '10px'} : {color: 'black', textDecoration: 'none', marginRight: '10px'}}  >
                                    Arbitrator
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link to='/members' style={ !this.state.isLogin ? {pointerEvents: 'none', color: 'black', textDecoration: 'none', marginRight: '10px'} : {color: 'black', textDecoration: 'none', marginRight: '10px'}}  >
                                    Members
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link to='/transfers' style={ !this.state.isLogin ? {pointerEvents: 'none', color: 'black', textDecoration: 'none', marginRight: '10px'} : {color: 'black', textDecoration: 'none', marginRight: '10px'}}  >
                                    Transfers
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Button color='primary' onClick={this.toggleModal}>Sign in</Button>
                                <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
                                    <ModalHeader toggle={this.toggleModal} className={this.props.className}>
                                    <ModalBody>
                                        Welcome to the Arbitration Portal! To use this portal, please sign in with Scatter first.
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color='primary'onClick={this.handleLogin}>Login</Button>
                                        <Button color='danger' onClick={this.logout}>Logout</Button>
                                    </ModalFooter>
                                    </ModalHeader>
                                </Modal>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>  
                <Switch>
                   <Route exact path='/' render={() => <div style={{ textAlign: 'center', marginTop: '150px' }}>
                                                            <h1>
                                                                Welcome to the Telos Arbitration Portal!
                                                            </h1>
                                                            <h3>In order to use the portal, please sign in with the button at the top right corner.</h3>
                                                            <img src={mainLogo} alt='mainLogo' />
                                                       </div>} />
                   <Route exact path='/arbitrators' component={Arbitrators} />
                   <Route exact path='/members' component={Members} />
                   <Route exact path='/transfers' component={Transfers} />
                   <Route render={() => <div style={{ padding: '20px', textAlign: 'center' }}>
                                            <h1>
                                                Page not found...
                                            </h1>
                                        </div>}/>
                </Switch>    
              </div>
          );
      }
  }

export default App;