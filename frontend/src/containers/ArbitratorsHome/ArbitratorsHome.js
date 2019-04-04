import React, { Component }      from 'react';

// Components
import CasesTable from  '../CasesTable';
import { Container, Row, Col } from 'reactstrap';

// Redux
import { connect }               from 'react-redux';
import { CasesActions } from 'business/actions';
import { AuthenticationSelectors, ArbitratorsSelectors, CasesSelectors } from 'business/selectors';

class ArbitratorsHome extends Component {

  render() {

    if(!this.props.isLogin || !this.props.arbitrator) {
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
        <CasesTable caseType="arbitrator" cases={this.props.arbitratorCases} />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  isLogin: AuthenticationSelectors.isLogin(state),
  arbitrator: ArbitratorsSelectors.arbitrator(state),
  arbitratorCases: CasesSelectors.getArbitratorCases(state),
});

const mapDispatchToProps = {
  fetchCases: CasesActions.fetchCases,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArbitratorsHome);
