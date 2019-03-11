import React, { Component }      from 'react';

// Components
import MembersModal from  '../MembersModal';
import { Modal, ModalHeader, ModalBody, ModalFooter, Table, Container, Row, Col, Button } from 'reactstrap';

// Redux
import { connect }               from 'react-redux';
import { CasesActions, ClaimsActions } from 'business/actions';
import { ClaimsSelectors, CasesSelectors } from 'business/selectors';

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
  onRespondCasefile(casefile) {
    return () => {
      // TODO
    }
  }
  onEditCasefile(casefile) {
    return () => {
      // TODO
    }
  }
  onReadyCasefile(casefile) {
    return () => {
      // TODO
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

  renderUnreadClaim(casefile, claim) {
    return (
      <tr key={claim._id}>
        <td className="claim-col">Claim: {claim.claim_id}</td>
        <td>Unread</td>
        <td>
          <Button color="danger" onClick={this.onDeleteClaim(casefile, claim)}>Delete</Button>
        </td>
      </tr>
    );
  }

  renderAcceptedClaim(casefile, claim) {
    return (
      <tr key={claim._id}>
        <th scope="row">Claim: {claim.claim_id}</th>
        <td>Accepted</td>
        <td></td>
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
          <Button color="info" onClick={this.onRespondCasefile(casefile)}>Respond</Button>
          <Button color="warning" onClick={this.onEditCasefile(casefile)}>Edit</Button>
          <Button color="danger" onClick={this.onDeleteCasefile(casefile)}>Delete</Button>
        </td>
      </tr>,
      ...casefile.unread_claims.map(claim => this.renderUnreadClaim(casefile, claim)),
      ...casefile.accepted_claims.map(claim => this.renderAcceptedClaim(casefile, claim)),
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

    return (
      <Container>

        <Row>
          <Col>
            <Button color="primary" onClick={this.onNewCase()}>New case</Button>
          </Col>
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
  cases: CasesSelectors.getCases(state),
});

const mapDispatchToProps = {
  setSelectedCase: CasesActions.setSelectedCase,
  setSelectedClaim: ClaimsActions.setSelectedClaim,
};

export default connect(mapStateToProps, mapDispatchToProps)(MembersHome);
