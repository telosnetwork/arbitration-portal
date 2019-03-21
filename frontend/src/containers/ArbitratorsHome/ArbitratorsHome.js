import React, { Component }      from 'react';

// Components
import CasesTable from  '../CasesTable';
import { Container, Row, Col, Button } from 'reactstrap';

// Redux
import { connect }               from 'react-redux';
import { CasesActions, ModalActions } from 'business/actions';
import { AuthenticationSelectors, ArbitratorsSelectors, CasesSelectors } from 'business/selectors';

class ArbitratorsHome extends Component {

  openArbitratorsSettings() {
    return () => {
      this.props.setAction('arbitratorsettings');
    }
  }

  render() {

    if(!this.props.isLogin || !this.props.arbitrator) {
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
          <Button color="primary" onClick={this.openArbitratorsSettings()} className="new-case-btn">
            <i className="fas fa-cog fas-left"></i>
            Arbitrator settings
          </Button>
        </Row>

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
  setAction: ModalActions.setAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArbitratorsHome);
