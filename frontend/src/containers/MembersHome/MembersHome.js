import React, { Component }      from 'react';

// Components
import CasesTable from  '../CasesTable';
import { Container, Row, Col, Button } from 'reactstrap';

// Redux
import { connect }               from 'react-redux';
import { ModalActions, CasesActions } from 'business/actions';
import { CasesSelectors } from 'business/selectors';
import { AuthenticationSelectors } from "../../business/selectors";

class MembersHome extends Component {

  onNewCase() {
    return () => {
      this.props.setAction('filecase');
    }
  }

  render() {

    if(!this.props.isLogin) {
      return (
        <Container>
          <Row>
            <Col xs="12">
              Please Login first!
            </Col>
          </Row>
        </Container>
      );
    }
    return (
      // <Container>

      <div>
        {/* <Row className="top-actions"> */}
          <Button color="primary" onClick={this.onNewCase()} className="new-case-btn" style={{ marginRight: '55px' }}>
            <i className="fas fa-plus fas-left"></i>
            New Case
          </Button>
        {/* </Row> */}

        <CasesTable caseType="claimant" cases={this.props.claimantCases} />
        <CasesTable caseType="respondant" cases={this.props.respondantCases} />
      </div>

      // </Container>
    )
  }
}

const mapStateToProps = state => ({
  isLogin: AuthenticationSelectors.isLogin(state),
  claimantCases: CasesSelectors.getClaimantCases(state),
  respondantCases: CasesSelectors.getRespondantCases(state),
});

const mapDispatchToProps = {
  setAction: ModalActions.setAction,
  fetchCases: CasesActions.fetchCases,
};

export default connect(mapStateToProps, mapDispatchToProps)(MembersHome);
