import React, { Component }      from 'react';

// Components
import ActionModal from '../ActionModal';
import CasesTable from  '../CasesTable';
import { Modal, Container, Row, Col, Button } from 'reactstrap';

// Redux
import { connect }               from 'react-redux';
import { CasesActions, ClaimsActions, ModalActions } from 'business/actions';
import { AuthenticationSelectors, ArbitratorsSelectors, CasesSelectors, ModalSelectors } from 'business/selectors';

class ArbitratorsHome extends Component {

  openArbitratorsSettings() {
    return () => {
      this.props.setAction('arbitratorsettings');
    }
  }

  closeAction() {
    return () => {
      this.props.setAction(null);
      this.props.setSelectedCase(null);
      this.props.setSelectedClaim(null);
    }
  }

  render() {

    if(!this.props.isLogin || !this.props.arbitrator) {
      return (
        <Container>
          <Row>
            <Col xs="12">
              Please login first
            </Col>
          </Row>
        </Container>
      );
    }
    return (
      <Container>

        <Row className="top-actions">
          <Button color="primary" onClick={this.openArbitratorsSettings()} className="new-case-btn">Arbitrator settings</Button>
        </Row>

        <CasesTable caseType="arbitrator" cases={this.props.arbitratorCases} />

        <Modal
          isOpen={!!this.props.modalAction}
          toggle={this.closeAction()}
          centered
        >
          <ActionModal actionName={this.props.modalAction} cancel={this.closeAction()}/>
        </Modal>

      </Container>
    )
  }
}

const mapStateToProps = state => ({
  isLogin: AuthenticationSelectors.isLogin(state),
  arbitrator: ArbitratorsSelectors.arbitrator(state),
  arbitratorCases: CasesSelectors.getArbitratorCases(state),
  modalAction: ModalSelectors.action(state),
});

const mapDispatchToProps = {
  fetchCases: CasesActions.fetchCases,
  setSelectedCase: CasesActions.setSelectedCase,
  setSelectedClaim: ClaimsActions.setSelectedClaim,
  setAction: ModalActions.setAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArbitratorsHome);
