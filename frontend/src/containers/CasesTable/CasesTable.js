import React, { Component }      from 'react';
import PropTypes from 'prop-types';

// Components
import { Jumbotron, Table, Container, Row, Button } from 'reactstrap';

// Redux
import { connect }               from 'react-redux';
import { CasesActions, ClaimsActions } from 'business/actions';
import { CasesSelectors } from 'business/selectors';
import CaseStatus from 'const/CaseStatus';
import DecisionClass from 'const/DecisionClass';

class CasesTable extends Component {

  constructor(props) {

    super(props);

    this.state = {
      caseClaimsOpen: {},
    };

  }

  openCaseClaims(casefileId) {
    const open = this.state.caseClaimsOpen[casefileId] !== undefined ?
      !this.state.caseClaimsOpen[casefileId] :
      true;

    this.setState({
      caseClaimsOpen: {
        ...this.state.caseClaimsOpen,
        [casefileId]: open,
      },
    });
  }


  onShredCasefile(casefile) {
    return () => {
      this.props.setSelectedCase(casefile.case_id);
      this.props.setMemberAction('shredcase');
    }
  }
  onRespondClaim(casefile, claim) {
    return () => {
      this.props.setSelectedCase(casefile.case_id);
      this.props.setSelectedClaim(claim.claim_id);
      this.props.setMemberAction('respondclaim');
    }
  }
  onReadyCasefile(casefile) {
    return () => {
      this.props.setSelectedCase(casefile.case_id);
      this.props.setMemberAction('readycase');
    }
  }
  onAddClaim(casefile) {
    return () => {
      this.props.setSelectedCase(casefile.case_id);
      this.props.setMemberAction('addclaim');
    }
  }
  onRemoveClaim(casefile, claim) {
    return () => {
      this.props.setSelectedCase(casefile.case_id);
      this.props.setSelectedClaim(claim.claim_id);
      this.props.setMemberAction('removeclaim');
    }
  }

  isClaimant() {
    return this.props.memberType === 'claimant';
  }
  isRespondant() {
    return this.props.memberType === 'respondant';
  }

  openSummary(claim) {
    window.open(`https://${claim.claim_summary}`);
  }
  openResponse(claim) {
    window.open(`https://${claim.response_link}`);
  }
  openDecision(claim) {
    window.open(`https://${claim.decision_link}`);
  }


  renderClaim(casefile, claim) {
    return (
      <tr key={claim._id}>
        <td className="claim-col">
          <Row style={{ alignItems: 'center' }}>
            <div className="claim-divider"/>
            <div>
              Claim {claim.claim_status === 'accepted' && `#${claim.claim_id}`}
            </div>
          </Row>
        </td>
        <td>
          {claim.claim_status === 'unread' && 'Unread'}
          {claim.claim_status === 'accepted' && 'Accepted'}
          {claim.claim_status === 'dismissed' && 'Declined'}
        </td>
        <td>
          {DecisionClass[claim.decision_class] || '-'}
        </td>
        <td align="right">
          <Button color="primary" onClick={() => this.openSummary(claim)}>Summary</Button>
          {!!claim.decision_link && <Button color="primary" onClick={() => this.openResponse(claim)}>Response</Button>}
          {!!claim.response_link && <Button color="primary" onClick={() => this.openDecision(claim)}>Decision</Button>}
          {this.isRespondant()   && <Button color="info"    onClick={this.onRespondClaim(casefile, claim)}>Respond</Button>}
          {claim.claim_status === 'unread' && this.isClaimant() && <Button color="danger" onClick={this.onRemoveClaim(casefile, claim)}>Remove</Button>}
        </td>
      </tr>
    );
  }

  renderClaims(casefile) {
    return (
      <tr key="claims">
        <td colSpan="6">
          <Table hover>
            <thead>
            <tr>
              <th sm="1">Claim ID</th>
              <th sm="3">Status</th>
              <th sm="3">Decision</th>
              <th sm="5" style={{textAlign: 'right'}}>Actions</th>
            </tr>
            </thead>
            <tbody>
            {casefile.claims.map(claim => this.renderClaim(casefile, claim))}
            </tbody>
          </Table>
        </td>
      </tr>
    );
  }

  renderCase(casefile) {

    const claims = this.state.caseClaimsOpen[casefile._id] ?
      this.renderClaims(casefile) :
      null;

    return [
      <tr key={casefile._id}>
        <th scope="row">
          {casefile.case_id}
        </th>
        <td>
          {CaseStatus[casefile.case_status]}
        </td>
        <td>
          {casefile.arbitrators.length > 0 ?
            casefile.arbitrators.join(',') :
            '-'
          }
        </td>
        <td>
          {casefile.approvals.length > 0 ?
            casefile.approvals.join(',') :
            '-'
          }
        </td>
        <td>
          {casefile.case_ruling ? casefile.case_ruling : '-'}
        </td>
        <td align="right">
          {this.isClaimant() && casefile.case_status === 0 &&
          <Button color="danger" onClick={this.onShredCasefile(casefile)}>Shred</Button>
          }
        </td>
      </tr>,
      <tr key="caseactions">
        <td>
          <Button color={this.state.caseClaimsOpen[casefile._id] ? 'warning' : 'info'} onClick={() => this.openCaseClaims(casefile._id)}>
            {this.state.caseClaimsOpen[casefile._id] ? 'Hide claims' : 'Show claims'}
          </Button>
        </td>
        <td>
          {this.isClaimant() && <Button color="primary" onClick={this.onAddClaim(casefile)}>Add claim</Button>}
        </td>
        <td align="right">
          {this.isClaimant() && <Button color="success" onClick={this.onReadyCasefile(casefile)}>Submit for arbitration</Button>}
        </td>
      </tr>,
      claims,
    ];

  }

  render() {

    return (
      <Container>

        <Jumbotron className="members-home-jumbo">

          <Row className="table-title">
            {this.props.memberType === 'claimant' && "Claimant cases"}
            {this.props.memberType === 'respondant' && "Respondant cases"}
          </Row>
          <Table>
            <thead>
            <tr>
              <th sm="1">Case ID</th>
              <th sm="1">Status</th>
              <th sm="3">Arbitrators</th>
              <th sm="3">Approvals</th>
              <th sm="1">Case ruling</th>
              <th sm="3" style={{textAlign: 'right'}}>Actions</th>
            </tr>
            </thead>
            <tbody>
            {this.props.cases.map(this.renderCase.bind(this))}
            </tbody>
          </Table>

        </Jumbotron>

      </Container>
    )
  }
}

const mapStateToProps = state => ({
  claimantCases: CasesSelectors.getClaimantCases(state),
});

const mapDispatchToProps = {
  setMemberAction: CasesActions.setMemberAction,
  setSelectedCase: CasesActions.setSelectedCase,
  setSelectedClaim: ClaimsActions.setSelectedClaim,
};

CasesTable.propTypes = {
  cases: PropTypes.array,
  memberType: PropTypes.oneOf(['claimant', 'respondant']),
};


export default connect(mapStateToProps, mapDispatchToProps)(CasesTable);
