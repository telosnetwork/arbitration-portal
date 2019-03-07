import React, { Component }      from 'react';
import { Link, Route, Switch }   from 'react-router-dom';

// Utilities
import ScatterBridge             from '../utils/scatterBridge';

// Components
import Transfers                 from '../containers/Transfers';
import Arbitrators               from '../containers/Arbitrators';
import Members                   from '../containers/Members';

// Resources
import mainLogo                  from '../resources/telosLogo.png'

// Redux
import { withRouter }            from 'react-router-dom';
import { connect }               from 'react-redux';
import { AuthenticationActions } from 'business/actions';
import { AuthenticationSelectors } from 'business/selectors';

// Reactstrap Components
import { Collapse, Navbar, NavbarToggler, Nav, NavItem }      from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

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
        const { setAuth } = this.props;
        const setaccounts = this.eosio.currentAccount ? this.eosio.currentAccount : null;
        setAuth({ isLogin: !this.props.authentication.isLogin, account: setaccounts });
    }

    /**
     * Scatter Bridge
     */

    handleLogin = async () => {
        await this.eosio.connect();
        await this.eosio.login();
        if (!(this.props.authentication.isLogin || this.props.authentication.account)) {
            if (this.eosio.isConnected && this.eosio.currentAccount) {
                this.toggleLogin();
            }
        }
        console.log(this.eosio);
        this.toggleModal();
    }

    logout = async () => {
        await this.eosio.logout();
        if (!(this.eosio.isConnected && this.eosio.currentAccount)) {
            this.toggleLogin();
        }
        this.toggleModal();
    }

    render() {
        document.title='Telos Portal';

        let status = (
            <div>
                <Button color='primary' onClick={this.toggleModal}>Login</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
                    <ModalHeader toggle={this.toggleModal} className={this.props.className}>
                    <ModalBody>
                        Welcome to the Arbitration Portal! To use this portal, please login with Scatter first.
                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary'onClick={this.handleLogin}>Login</Button>
                        <Button color='danger' onClick={this.logout}>Logout</Button>
                    </ModalFooter>
                    </ModalHeader>
                </Modal>
            </div>
        );

        if (this.props.authentication.isLogin && this.props.authentication.account) {
            status = (
                <div>
                    <Button color='primary' style={{ fontWeight: 'bold' }} onClick={this.toggleModal} outline>Logged in as: {this.props.authentication.account.name}</Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
                        <ModalHeader toggle={this.toggleModal} className={this.props.className}>
                        <ModalBody>
                            You are now logged in to Scatter on the Arbitration Portal! <br></br>
                            Please feel free to navigate around. <br></br>
                            As of the writing of this we have 3 available tools to use, the transfer (eosio.token) action, the actions for both members and elected arbitrators of an arbitration under the eosio.arb contract account. 
                        </ModalBody>
                        <ModalFooter>
                            <Button color='danger' onClick={this.logout}>Logout</Button>
                        </ModalFooter>
                        </ModalHeader>
                    </Modal>     
                </div>       
            )
        }

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
                                <Link to='/arbitrators' style={ !this.props.authentication.isLogin ? {pointerEvents: 'none', color: 'black', textDecoration: 'none', marginRight: '10px'} : {color: 'black', textDecoration: 'none', marginRight: '10px'}} >
                                    Arbitrator
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link to='/members' style={ !this.props.authentication.isLogin ? {pointerEvents: 'none', color: 'black', textDecoration: 'none', marginRight: '10px'} : {color: 'black', textDecoration: 'none', marginRight: '10px'}} >
                                    Members
                                </Link>
                            </NavItem>
                            <NavItem>
                                <Link to='/transfers' style={ !this.props.authentication.isLogin ? {pointerEvents: 'none', color: 'black', textDecoration: 'none', marginRight: '10px'} : {color: 'black', textDecoration: 'none', marginRight: '10px'}} >
                                    Transfers
                                </Link>
                            </NavItem>
                            <NavItem>
                                {status}
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
                   <Route exact path='/members'     component={Members} />
                   <Route exact path='/transfers'   component={Transfers} />
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
export default withRouter( connect(mapStateToProps, mapDispatchToProps)(App) );