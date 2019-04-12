import React, { Component }      from 'react';

// Redux
import { connect }               from 'react-redux';
import { AuthenticationActions } from 'business/actions';
import { AuthenticationSelectors } from 'business/selectors';

// Reactstrap Components
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// import scatterSvg from '../../resources/gs_button_loginwithscatter_blue.svg';
import scatterBadgeSvg from '../../resources/scatter_badge_transparent.svg';

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
    // this.props.login();
  }

  toggleModal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  login = async () => {

    this.props.login();
    // this.toggleModal();

  }

  logout = async () => {

    this.props.logout();
    this.toggleModal();

  }

  render() {

    if (this.props.authentication.isLogin && this.props.authentication.account) {

      return (<div>
        <Button color='info' style={{ fontWeight: 'bold' }} onClick={this.toggleModal} outline>
          <img className="fas-left" alt="scatter" src={scatterBadgeSvg} height={20}  />
          <span>Logged in as: {this.props.authentication.account.name}</span>
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
          <ModalHeader toggle={this.toggleModal} className={this.props.className}>
            <ModalBody>
              Thank you for using the Telos Arbitration Portal!
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
          <Button color='primary' style={{ fontWeight: 'bold' }} onClick={this.login} outline>
          {/* <Button color='primary' style={{ fontWeight: 'bold' }} onClick={this.toggleModal} outline> */}
            <img  className="fas-left" alt="scatter" src={scatterBadgeSvg} height={25}  />
            <span style={{ position: 'relative', top: '2px' }} >Scatter Login</span>
          </Button>
          {/* <img alt="Login with scatter" src={scatterSvg} onClick={this.toggleModal} height={33} style={{  cursor: 'pointer'}} /> */}
          {/* <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
            <ModalHeader toggle={this.toggleModal} className={this.props.className}>
              <ModalBody>
                Welcome to the Arbitration Portal! To use this portal, please login with Scatter first.
              </ModalBody>
              <ModalFooter>
                <Button color='primary'onClick={this.login}>Login</Button>
              </ModalFooter>
            </ModalHeader>
          </Modal> */}
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
