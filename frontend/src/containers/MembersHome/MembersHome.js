import React, { Component }      from 'react';

// Components
import MembersModal from  '../MembersModal';
import { Jumbotron, Modal, Table, Container, Row, Col, Button } from 'reactstrap';

// Redux
import { connect }               from 'react-redux';
import { CasesActions, ClaimsActions } from 'business/actions';
import { CasesSelectors } from 'business/selectors';
import {AuthenticationSelectors} from "../../business/selectors";

class MembersHome extends Component {

  constructor(props) {

    super(props);

    this.state = {
      memberAction: null,
    }

  }

  onNewCase() {
    return () => {
      this.props.setSelectedCase(null);
      this.setState({
        memberAction: 'filecase',
      })
    }
  }
  onDeleteCasefile(casefile) {
    return () => {
      this.props.setSelectedCase(casefile.case_id);
      this.setState({
        memberAction: 'deletecase',
      });
    }
  }
  onRespondClaim(casefile, claim) {
    return () => {
      this.props.setSelectedCase(casefile.case_id);
      this.props.setSelectedClaim(claim.claim_id);
      this.setState({
        memberAction: 'respondclaim',
      });
    }
  }
  onReadyCasefile(casefile) {
    return () => {
      this.props.setSelectedCase(casefile.case_id);
      this.setState({
        memberAction: 'readycase',
      });
    }
  }
  onAddClaim(casefile) {
    return () => {
      this.props.setSelectedCase(casefile.case_id);
      this.setState({
        memberAction: 'addclaim',
      });
    }
  }
  onDeleteClaim(casefile, claim) {
    return () => {
      this.props.setSelectedCase(casefile.case_id);
      this.props.setSelectedClaim(claim.claim_id);
      this.setState({
        memberAction: 'deleteclaim',
      });
    }
  }
  closeAction() {
    return () => {
      this.setState({
        memberAction: null,
      });
      this.props.setSelectedCase(null);
      this.props.setSelectedClaim(null);
    }
  }

  renderClaim(casefile, claim) {
    return (
      <tr key={claim._id}>
        <td className="claim-col">Claim: {claim.claim_id}</td>
        <td>
          {claim.claim_status === 'unread' && 'Unread'}
          {claim.claim_status === 'accepted' && 'Accepted'}
          {claim.claim_status === 'dismissed' && 'Declined'}
        </td>
        <td>
          <Button color="info" onClick={this.onRespondClaim(casefile, claim)}>Respond</Button>
          {claim.claim_status === 'unread' && <Button color="danger" onClick={this.onDeleteClaim(casefile, claim)}>Delete</Button>}
        </td>
      </tr>
    );
  }
  renderCase(casefile) {
    return [
      <tr key={casefile._id}>
        <th scope="row">
          {casefile.case_id}
        </th>
        <td>
          {casefile.case_status}
        </td>
        <td>
          <Button color="danger" onClick={this.onDeleteCasefile(casefile)}>Delete</Button>
        </td>
      </tr>,
      ...casefile.claims.map(claim => this.renderClaim(casefile, claim)),
      <tr key="caseactions">
        <td>
          <Button color="primary" onClick={this.onAddClaim(casefile)}>Add claim</Button>
        </td>
        <td>
          <Button color="success" onClick={this.onReadyCasefile(casefile)}>Submit for arbitration</Button>
        </td>
        <td/>
      </tr>,
    ];

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

        <Jumbotron className="members-home-jumbo">

          <Row className="top-actions">
            <Button color="primary" onClick={this.onNewCase()} className="new-case-btn">New case</Button>
          </Row>

          <Table hover>
            <thead>
            <tr>
              <th sm="4">Case ID</th>
              <th sm="4">Status</th>
              <th sm="4">Actions</th>
            </tr>
            </thead>
            <tbody>
            {this.props.cases.map(this.renderCase.bind(this))}
            </tbody>
          </Table>
        </Jumbotron>


        <Modal
          isOpen={!!this.state.memberAction}
          toggle={this.closeAction()}
          centered
        >
          <MembersModal actionName={this.state.memberAction} cancel={this.closeAction()}/>
        </Modal>

      </Container>
    )
  }
}

const mapStateToProps = state => ({
  isLogin: AuthenticationSelectors.isLogin(state),
  cases: CasesSelectors.getCases(state),
});

const mapDispatchToProps = {
  setSelectedCase: CasesActions.setSelectedCase,
  setSelectedClaim: ClaimsActions.setSelectedClaim,
};

export default connect(mapStateToProps, mapDispatchToProps)(MembersHome);
