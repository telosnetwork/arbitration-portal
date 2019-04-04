import React, { Component }      from 'react';

// Components
import CasesTable from  '../CasesTable';
import { Container, Row, Col } from 'reactstrap';

// Redux
import { connect }               from 'react-redux';
import { CasesActions } from 'business/actions';
import { CasesSelectors } from 'business/selectors';
import { AuthenticationSelectors } from "../../business/selectors";

class MembersHome extends Component {

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
      <Container>

        <CasesTable caseType="claimant" cases={this.props.claimantCases} />
        <CasesTable caseType="respondant" cases={this.props.respondantCases} />

      </Container>
    )
  }
}

const mapStateToProps = state => ({
  isLogin: AuthenticationSelectors.isLogin(state),
  claimantCases: CasesSelectors.getClaimantCases(state),
  respondantCases: CasesSelectors.getRespondantCases(state),
});

const mapDispatchToProps = {
  fetchCases: CasesActions.fetchCases,
};

export default connect(mapStateToProps, mapDispatchToProps)(MembersHome);
