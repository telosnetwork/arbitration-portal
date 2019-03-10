import React, { Component }      from 'react';

// Utilities
import ScatterBridge             from 'utils/scatterBridge';

// Redux
import { connect }               from 'react-redux';
import { AuthenticationActions } from 'business/actions';
import { AuthenticationSelectors } from 'business/selectors';

// Reactstrap Components
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Login extends Component {

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
        this.handleLogin  = this.handleLogin.bind(this);
        this.toggleLogin  = this.toggleLogin.bind(this);

        this.logout       = this.logout.bind(this);
    }

    toggleModal() {
        this.setState(prevState => ({
            modal: !prevState.modal
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

        if (this.props.authentication.isLogin && this.props.authentication.account) {

            return (<div>
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
            </div> );

        } else {

            return (
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
        }
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
export default connect(mapStateToProps, mapDispatchToProps)(Login);
