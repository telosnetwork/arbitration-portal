import React, { Component } from 'react';

// Components
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

// Redux
import { connect }               from 'react-redux';
import { ModalActions } from 'business/actions';
import { ModalSelectors } from 'business/selectors';

class ErrorModal extends Component {

  close() {
    return () => {
      this.props.setActionError(null);
    }
  }

  render() {
    return (
      <Modal
        isOpen={!!this.props.actionError}
        toggle={this.close()}
        centered
      >
        <ModalHeader>
          ERROR
        </ModalHeader>

        <ModalBody className="loading-body">

            {this.props.actionError && this.props.actionError.message}.

        </ModalBody>

        <ModalFooter key="footer">
          <Button color="info" onClick={this.close()}>Close</Button>
        </ModalFooter>

      </Modal>
    );
  }

}

const mapStateToProps = state => ({
  actionError: ModalSelectors.actionError(state),
});

const mapDispatchToProps = {
  setActionError: ModalActions.setActionError,
};

// Export a redux connected component
export default connect(mapStateToProps, mapDispatchToProps)(ErrorModal);
