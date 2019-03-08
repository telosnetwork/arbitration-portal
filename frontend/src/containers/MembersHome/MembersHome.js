import React, { Component }      from 'react';

// Components
import MembersModal from  '../MembersModal';

// Redux
import { connect }               from 'react-redux';
import { CasesSelectors } from 'business/selectors';

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
      this.setState({
        memberAction: 'addclaim',
        casefile,
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
      <div>
        <span>Claim: {claim.claim_id}</span>
        <span>Unread</span>
        <div onClick={this.onDeleteClaim(casefile, claim)}>Delete</div>
      </div>
    );
  }

  renderAcceptedClaim(casefile, claim) {
    return (
      <div>
        <span>Claim: {claim.claim_id}</span>
        <span>Accepted</span>
      </div>
    );
  }

  renderCase(casefile) {
    return (
      <div>
        <span>Case: {casefile.case_id}</span>
        <span>Status: {casefile.case_status}</span>
        <div onClick={this.onRespondCasefile(casefile)}>Respond</div>
        <div onClick={this.onEditCasefile(casefile)}>Edit</div>
        <div onClick={this.onDeleteCasefile(casefile)}>Delete</div>

        <ul>
          {casefile.unread_claims.map(claim =>
            <li key={claim._id}>{this.renderUnreadClaim(casefile, claim)}</li>
          )}
        </ul>

        <ul>
          {casefile.accepted_claims.map(claim =>
            <li key={claim._id}>{this.renderAcceptedClaim(casefile, claim)}</li>
          )}
        </ul>

        <div onClick={this.onAddClaim(casefile)}>Add claim</div>
        <div onClick={this.onReadyCasefile(casefile)}>Submit for arbitration</div>

      </div>
    );
  }

  render() {

    return (
      <div className='MemberContent'>

        <div onClick={this.onNewCase()}>New case</div>

        <ul>
          {this.props.cases.map(c => <li key={c._id}>{this.renderCase(c)}</li>)}
        </ul>

        {this.state.memberAction ?
          <div className="action-modal">

            <div onClick={this.closeAction()}>X</div>

            <MembersModal actionName={this.state.memberAction} />

          </div> : null}

      </div>
    )
  }
}

const mapStateToProps = state => ({
  cases: CasesSelectors.getCases(state),
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(MembersHome);
