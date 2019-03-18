import React, { Component }      from 'react';
import PropTypes from 'prop-types';

// Components
import { Table, Button } from 'reactstrap';

// Redux
import { connect }               from 'react-redux';
import { CasesActions, ClaimsActions, ModalActions } from 'business/actions';
import DecisionClass from 'const/DecisionClass';

class ClaimsTable extends Component {

  onRespondClaim(casefile, claim) {
    return () => {
      this.props.setSelectedCase(casefile.case_id);
      this.props.setSelectedClaim(claim.claim_summary);
      this.props.setAction('respondclaim');
    }
  }
  onRemoveClaim(casefile, claim) {
    return () => {
      this.props.setSelectedCase(casefile.case_id);
      this.props.setSelectedClaim(claim.claim_summary);
      this.props.setAction('removeclaim');
    }
  }

  isClaimant() {
    return this.props.caseType === 'claimant';
  }
  isRespondant() {
    return this.props.caseType === 'respondant';
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

  renderClaim(claim) {
    const { casefile } = this.props;
    return (
      <tr key={claim.claim_summary}>
        <td className="claim-col">
          Claim #{claim.claim_status === 'accepted' ? `${claim.claim_id}` : '-'}
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
          {!!claim.response_link && <Button color="primary" onClick={() => this.openResponse(claim)}>Response</Button>}
          {!!claim.decision_link && <Button color="primary" onClick={() => this.openDecision(claim)}>Decision</Button>}
          {claim.claim_status === 'unread' && casefile.case_status === 2 && this.isRespondant() &&
          <Button color="info" onClick={this.onRespondClaim(casefile, claim)}>Respond</Button>
          }
          {claim.claim_status === 'unread' && casefile.case_status === 0 &&
          this.isClaimant() && <Button color="danger" onClick={this.onRemoveClaim(casefile, claim)}>Remove</Button>}
        </td>
      </tr>
    );
  }

  render() {

    const { casefile } = this.props;
    return (
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
        {casefile.claims.map(claim => this.renderClaim(claim))}
        </tbody>
      </Table>
    );

  }
}

const mapDispatchToProps = {
  setAction: ModalActions.setAction,
  setSelectedCase: CasesActions.setSelectedCase,
  setSelectedClaim: ClaimsActions.setSelectedClaim,
};

ClaimsTable.propTypes = {
  casefile: PropTypes.object,
};


export default connect(null, mapDispatchToProps)(ClaimsTable);
