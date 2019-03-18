import React, { Component }      from 'react';

// Components
import ActionModal from '../ActionModal';
import CasesTable from  '../CasesTable';
import { Modal, Container, Row, Col, Button } from 'reactstrap';

// Redux
import { connect }               from 'react-redux';
import { ModalActions, CasesActions, ClaimsActions } from 'business/actions';
import { CasesSelectors, ModalSelectors } from 'business/selectors';
import { AuthenticationSelectors } from "../../business/selectors";

class MembersHome extends Component {

  onNewCase() {
    return () => {
      this.props.setAction('filecase');
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

    if(!this.props.isLogin) {
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
          <Button color="primary" onClick={this.onNewCase()} className="new-case-btn">New case</Button>
        </Row>

        <CasesTable caseType="claimant" cases={this.props.claimantCases} />
        <CasesTable caseType="respondant" cases={this.props.respondantCases} />

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
  claimantCases: CasesSelectors.getClaimantCases(state),
  respondantCases: CasesSelectors.getRespondantCases(state),
  modalAction: ModalSelectors.action(state),
});

const mapDispatchToProps = {
  setAction: ModalActions.setAction,
  fetchCases: CasesActions.fetchCases,
  setSelectedCase: CasesActions.setSelectedCase,
  setSelectedClaim: ClaimsActions.setSelectedClaim,
};

export default connect(mapStateToProps, mapDispatchToProps)(MembersHome);
