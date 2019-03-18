import React, { Component }      from 'react';

// Components
import ActionModal from '../ActionModal';
import CasesTable from  '../CasesTable';
import { Modal, Container, Row, Col, Button } from 'reactstrap';

// Redux
import { connect }               from 'react-redux';
import { CasesActions, ClaimsActions } from 'business/actions';
import { CasesSelectors } from 'business/selectors';
import {AuthenticationSelectors} from "../../business/selectors";

class MembersHome extends Component {

  onNewCase() {
    return () => {
      this.props.setMemberAction('filecase');
    }
  }

  closeAction() {
    return () => {
      this.props.setMemberAction(null);
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

        <CasesTable memberType="claimant" cases={this.props.claimantCases} />
        <CasesTable memberType="respondant" cases={this.props.respondantCases} />

        <Modal
          isOpen={!!this.props.memberAction}
          toggle={this.closeAction()}
          centered
        >
          <ActionModal actionName={this.props.memberAction} cancel={this.closeAction()}/>
        </Modal>

      </Container>
    )
  }
}

const mapStateToProps = state => ({
  isLogin: AuthenticationSelectors.isLogin(state),
  claimantCases: CasesSelectors.getClaimantCases(state),
  respondantCases: CasesSelectors.getRespondantCases(state),
  memberAction: CasesSelectors.memberAction(state),
});

const mapDispatchToProps = {
  setMemberAction: CasesActions.setMemberAction,
  fetchCases: CasesActions.fetchCases,
  setSelectedCase: CasesActions.setSelectedCase,
  setSelectedClaim: ClaimsActions.setSelectedClaim,
};

export default connect(mapStateToProps, mapDispatchToProps)(MembersHome);
