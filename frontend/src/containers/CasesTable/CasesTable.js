import React, { Component }      from 'react';
import PropTypes from 'prop-types';

// Components
import { Jumbotron, Table, Container, Row, Button } from 'reactstrap';
import ClaimsTable from '../ClaimsTable';

// Redux
import { connect }               from 'react-redux';
import { CasesActions, ModalActions } from 'business/actions';
import CaseStatus from 'const/CaseStatus';

class CasesTable extends Component {

  constructor(props) {

    super(props);

    this.state = {
      caseClaimsOpen: {},
    };

  }

  openCaseClaims(casefileId) {
    const open = this.state.caseClaimsOpen[casefileId] !== undefined ?
      !this.state.caseClaimsOpen[casefileId] : true;

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
      this.props.setAction('shredcase');
    }
  }
  onSubmitCasefile(casefile) {
    return () => {
      this.props.setSelectedCase(casefile.case_id);
      this.props.setAction('submitcasefile');
    }
  }
  onAddClaim(casefile) {
    return () => {
      this.props.setSelectedCase(casefile.case_id);
      this.props.setAction('addclaim');
    }
  }

  isClaimant() {
    return this.props.caseType === 'claimant';
  }

  onOpenCaseRuling(casefile) {
    window.open(`https://${casefile.case_ruling}`);
  }

  renderCase(casefile) {

    return [
      <tr key={casefile.case_id}>
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
        <td align="right">
          {this.isClaimant() && casefile.case_status === 0 &&
          <Button color="danger" onClick={this.onShredCasefile(casefile)}>Shred</Button>
          }
          {casefile.case_ruling &&
          <Button color="info" onClick={() => this.onOpenCaseRuling(casefile)}>Case ruling</Button>
          }
        </td>
      </tr>,
      <tr key="caseactions">
        <td>
          {casefile.claims.length > 0 ?
            <Button color={this.state.caseClaimsOpen[casefile.case_id] ? 'warning' : 'info'} onClick={() => this.openCaseClaims(casefile.case_id)}>
              {this.state.caseClaimsOpen[casefile.case_id] ? 'Hide claims' : 'Show claims'}
            </Button>
            :
            'No claims'
          }
        </td>
        <td>
          {this.isClaimant() && casefile.case_status === 0  &&
          <Button color="primary" onClick={this.onAddClaim(casefile)}>Add claim</Button>
          }
        </td>
        <td align="right">
          {this.isClaimant() && casefile.case_status === 0 &&
          <Button color="success" onClick={this.onSubmitCasefile(casefile)}>Submit for arbitration</Button>
          }
        </td>
        <td/>
        <td/>
        <td/>
      </tr>,
      this.state.caseClaimsOpen[casefile.case_id] &&
      <tr key="claims">
        <td colSpan="5">
          <ClaimsTable casefile={casefile} caseType={this.props.caseType} />
        </td>
      </tr>,
    ];

  }

  render() {

    return (
      <Container>

        <Jumbotron className="members-home-jumbo">

          <Row className="table-title">
            {this.props.caseType === 'claimant' && "Claimant cases"}
            {this.props.caseType === 'respondant' && "Respondant cases"}
            {this.props.caseType === 'arbitrator' && "Arbitrator cases"}
          </Row>
          <Table>
            <thead>
            <tr>
              <th sm="1">Case ID</th>
              <th sm="1">Status</th>
              <th sm="3">Arbitrators</th>
              <th sm="3">Approvals</th>
              <th sm="4" style={{textAlign: 'right'}}>Actions</th>
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

const mapDispatchToProps = {
  setAction: ModalActions.setAction,
  setSelectedCase: CasesActions.setSelectedCase,
};

CasesTable.propTypes = {
  cases: PropTypes.array,
  caseType: PropTypes.oneOf(['claimant', 'respondant', 'arbitrator']),
};


export default connect(null, mapDispatchToProps)(CasesTable);
