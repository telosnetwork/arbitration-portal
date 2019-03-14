import React, { Component }      from 'react';

// Redux
import { connect }               from 'react-redux';
import { AuthenticationActions } from 'business/actions';
import { AuthenticationSelectors } from 'business/selectors';

// Reactstrap Components
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Login extends Component {

  constructor (props) {
    super(props);

    this.state = {
      modal:   false,
      isOpen:  false
    };
  }

  componentDidMount() {
    // TODO remove this, just for dev
    this.props.login();
  }

  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  login = async () => {

    this.props.login();
    this.toggleModal();

  }

  logout = async () => {

    this.props.logout();
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
                <Button color='primary'onClick={this.login}>Login</Button>
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
  login: AuthenticationActions.login,
  logout: AuthenticationActions.logout,
};

// Export a redux connected component
export default connect(mapStateToProps, mapDispatchToProps)(Login);
