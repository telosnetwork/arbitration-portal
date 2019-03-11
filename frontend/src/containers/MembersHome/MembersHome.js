import React, { Component }      from 'react';

// Components
import MembersModal from  '../MembersModal';
import { Container, Row, Col, Button } from 'reactstrap';

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
      // TODO
    }
  }
  onDeleteCasefile(casefile) {
    return () => {
      // TODO
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
      })
    }
  }
  onDeleteClaim(casefile, claim) {
    return () => {
      // TODO
    }
  }
  closeAction() {
    return () => {
      this.setState({
        memberAction: null,
      })
    }
  }

  renderUnreadClaim(casefile, claim) {
    return (
      <Row key={claim._id}>
        <Col sm="4">Claim: {claim.claim_id}</Col>
        <Col sm="4">Unread</Col>
        <Col sm="4">
          <Button color="danger" onClick={this.onDeleteClaim(casefile, claim)}>Delete</Button>
        </Col>
      </Row>
    );
  }

  renderAcceptedClaim(casefile, claim) {
    return (
      <Row key={claim._id}>
        <Col sm="4">Claim: {claim.claim_id}</Col>
        <Col sm="4">Accepted</Col>
        <Col sm="4"></Col>
      </Row>
    );
  }

  renderCase(casefile) {
    return (
      <Row key={casefile._id}>
        <Container>
          <Row>
            <Col sm="4">{casefile.case_id}</Col>
            <Col sm="4">{casefile.case_status}</Col>
            <Col sm="4">
              <Button color="info" onClick={this.onRespondCasefile(casefile)}>Respond</Button>
              <Button color="warning" onClick={this.onEditCasefile(casefile)}>Edit</Button>
              <Button color="danger" onClick={this.onDeleteCasefile(casefile)}>Delete</Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Container>
                {casefile.unread_claims.map(claim => this.renderUnreadClaim(casefile, claim))}
              </Container>
            </Col>
          </Row>
          <Row>
            <Col>
              <Container>
                {casefile.accepted_claims.map(claim => this.renderAcceptedClaim(casefile, claim))}
              </Container>
            </Col>
          </Row>
          <Row>
            <Button color="primary" onClick={this.onAddClaim(casefile)}>Add claim</Button>
          </Row>
          <Row>
            <Button color="success" onClick={this.onReadyCasefile(casefile)}>Submit for arbitration</Button>
          </Row>
        </Container>

      </Row>
    );
  }

  render() {

    return (
      <Container>

        <Row>
          <Col>
            <Button color="primary" onClick={this.onNewCase()}>New case</Button>
          </Col>
        </Row>

        <Row>
          <Col sm="4">Case ID</Col>
          <Col sm="4">Status</Col>
          <Col sm="4">Actions</Col>
        </Row>

        <Row>
          <Container>
            {this.props.cases.map(this.renderCase.bind(this))}
          </Container>
        </Row>

        {this.state.memberAction ?
          <div className="action-modal">

            <div onClick={this.closeAction()}>X</div>

            <MembersModal actionName={this.state.memberAction} />

          </div> : null}

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
