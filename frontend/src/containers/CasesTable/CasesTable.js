import React, { Component }      from 'react';
import PropTypes from 'prop-types';

// Components
import { Col, UncontrolledTooltip, Jumbotron, Container, Row, Button } from 'reactstrap';
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
  onSetCaseRuling(casefile) {
    return () => {
      this.props.setSelectedCase(casefile.case_id);
      this.props.setAction('setruling');
    }
  }
  onAddArbs(casefile) {
    return () => {
      this.props.setSelectedCase(casefile.case_id);
      this.props.setAction('addarbs');
    }
  }
  onRecuse(casefile) {
    return () => {
      this.props.setSelectedCase(casefile.case_id);
      this.props.setAction('recuse');
    }
  }
  onEdit(casefile) {
    return () => {
      this.props.setSelectedCase(casefile.case_id);
      this.props.setAction('editcase');
    }
  }
  onNewCase() {
    return () => {
      this.props.setAction('filecase');
    }
  }
  openArbitratorsSettings() {
    return () => {
      this.props.setAction('arbitratorsettings');
    }
  }

  isClaimant() {
    return this.props.caseType === 'claimant';
  }

  isArbitrator() {
    return this.props.caseType === 'arbitrator';
  }

  onOpenCaseRuling(casefile) {
    return () => {
      window.open(`https://web.ipfs.telosfoundation.io/${casefile.case_ruling}`);
    };
  }

  renderCase(casefile) {

    return [
      <Jumbotron className="members-home-jumbo border-x">
        <Row key={casefile.case_id}>
          <Col className='cases-info'>
            <h3>Case : #{casefile.case_id}</h3>
          </Col>
          <Col style={{textAlign: 'right'}}>
            {this.isClaimant() && casefile.case_status === 0 &&
            <Button id={`shred-case-btn-${casefile.case_id}`} color="danger" onClick={this.onShredCasefile(casefile)}>
              <i className="fas fa-trash-alt"></i>
              <UncontrolledTooltip placement="bottom" target={`shred-case-btn-${casefile.case_id}`}>
                Shred Case
              </UncontrolledTooltip>
            </Button>
            }
            {casefile.case_ruling &&
            <Button id={`open-case-ruling-btn-${casefile.case_id}`} color="primary" onClick={this.onOpenCaseRuling(casefile)}>
              <i className="fas fa-file-alt"></i>
              <UncontrolledTooltip placement="bottom" target={`open-case-ruling-btn-${casefile.case_id}`}>
                Open Case Ruling
              </UncontrolledTooltip>
            </Button>
            }
            {this.isArbitrator() && casefile.case_status === 6 &&
            <Button id={`set-case-ruling-btn-${casefile.case_id}`} color="info" onClick={this.onSetCaseRuling(casefile)}>
              <i className="fas fa-file-alt"></i>
              <UncontrolledTooltip placement="bottom" target={`set-case-ruling-btn-${casefile.case_id}`}>
                Set Case Ruling
              </UncontrolledTooltip>
            </Button>
            }
            {this.isArbitrator() && casefile.case_status === 2 &&
            <Button id={`case-addarbs-btn-${casefile.case_id}`} color="info" onClick={this.onAddArbs(casefile)}>
              <i className="fas fa-user-plus"></i>
              <UncontrolledTooltip placement="bottom" target={`case-addarbs-btn-${casefile.case_id}`}>
                Add Arbitrators
              </UncontrolledTooltip>

            </Button>
            }
            {this.isArbitrator() && casefile.case_status >= 2 && casefile.case_status <= 6 &&
            <Button id={`case-recuse-btn-${casefile.case_id}`} color="info" onClick={this.onRecuse(casefile)}>
              <i className="fas fa-user-minus"></i>
              <UncontrolledTooltip placement="bottom" target={`case-recuse-btn-${casefile.case_id}`}>
                Recuse
              </UncontrolledTooltip>
            </Button>
            }
            {this.isArbitrator() &&
            <Button id={`case-edit-btn-${casefile.case_id}`} color="info" onClick={this.onEdit(casefile)}>
              <i className="fas fa-user-edit"></i>
              <UncontrolledTooltip placement="bottom" target={`case-edit-btn-${casefile.case_id}`}>
                Edit Case
              </UncontrolledTooltip>
            </Button>
            }
          </Col>
        </Row>
        <Row>
          <Col className='cases-info'>
            <i><b>Case Status</b>: {CaseStatus[casefile.case_status]}</i>
          </Col>
        </Row>
        <Row>
          <Col className='cases-info'>
            <i><b>Claimant</b>: {casefile.claimant}</i>
          </Col>
        </Row>
        <Row>
          <Col className='cases-info'>
            <i><b>Respondent</b>: {casefile.respondant}</i>
          </Col>
        </Row>
        <Row style={{wordBreak: 'break-all'}}>
          <Col className='cases-info'>
            <i><b>Arbitrators</b>: {casefile.arbitrators.length > 0 ?
                                    casefile.arbitrators.join(', '): '-'}</i>
          </Col>
        </Row>
        <br></br>
        <Row>
          <Col>
            {casefile.claims.length > 0 ?
              <Button color={this.state.caseClaimsOpen[casefile.case_id] ? 'light' : 'dark'} onClick={() => this.openCaseClaims(casefile.case_id)}>
                {this.state.caseClaimsOpen[casefile.case_id] ? '-' : '+'}
              </Button>
              :
              'No Claims'
            }
          </Col>
          <Col style={{textAlign: 'right'}}>
            {this.isClaimant() && casefile.case_status === 0  &&
              <Button color="primary" onClick={this.onAddClaim(casefile)}>Add Claim</Button>
            }
          </Col>
        </Row>
        <br></br>
        {this.state.caseClaimsOpen[casefile.case_id] ? 
          <Row key="claims">
            <Col>
              <ClaimsTable casefile={casefile} caseType={this.props.caseType} />
            </Col>
          </Row> : null}
        <Row>
          {this.isClaimant() && casefile.case_status === 0 &&
            <Col>
              <Button color="success" onClick={this.onSubmitCasefile(casefile)}>Submit for Arbitration</Button>
            </Col>
          }
        </Row>
      </Jumbotron>

      // <Row key={casefile.case_id}>
      //   <th scope="row">
      //     {casefile.case_id}
      //   </th>
      //   <td>
      //     {CaseStatus[casefile.case_status]}
      //   </td>
      //   <td style={{wordBreak: 'break-all'}}>
      //     {casefile.arbitrators.length > 0 ?
      //       casefile.arbitrators.join(', ') :
      //       '-'
      //     }
      //   </td>
      //   <td>
      //     {casefile.approvals.length > 0 ?
      //       casefile.approvals.join(', ') :
      //       '-'
      //     }
      //   </td>
      //   {this.props.caseType !== 'claimant' &&
      //   <td>
      //     {casefile.claimant}
      //   </td>
      //   }
      //   {this.props.caseType !== 'respondant' &&
      //   <td>
      //     {casefile.respondant}
      //   </td>
      //   }
      //   <td align="right">
          // {this.isClaimant() && casefile.case_status === 0 &&
          // <Button id={`shred-case-btn-${casefile.case_id}`} color="danger" onClick={this.onShredCasefile(casefile)}>
          //   <i className="fas fa-trash-alt"></i>
          //   <UncontrolledTooltip placement="bottom" target={`shred-case-btn-${casefile.case_id}`}>
          //     Shred Case
          //   </UncontrolledTooltip>
          // </Button>
          // }
          // {casefile.case_ruling &&
          // <Button id={`open-case-ruling-btn-${casefile.case_id}`} color="primary" onClick={this.onOpenCaseRuling(casefile)}>
          //   <i className="fas fa-file-alt"></i>
          //   <UncontrolledTooltip placement="bottom" target={`open-case-ruling-btn-${casefile.case_id}`}>
          //     Open Case Ruling
          //   </UncontrolledTooltip>
          // </Button>
          // }
          // {this.isArbitrator() && casefile.case_status === 6 &&
          // <Button id={`set-case-ruling-btn-${casefile.case_id}`} color="info" onClick={this.onSetCaseRuling(casefile)}>
          //   <i className="fas fa-file-alt"></i>
          //   <UncontrolledTooltip placement="bottom" target={`set-case-ruling-btn-${casefile.case_id}`}>
          //     Set Case Ruling
          //   </UncontrolledTooltip>
          // </Button>
          // }
          // {this.isArbitrator() && casefile.case_status === 2 &&
          // <Button id={`case-addarbs-btn-${casefile.case_id}`} color="info" onClick={this.onAddArbs(casefile)}>
          //   <i className="fas fa-user-plus"></i>
          //   <UncontrolledTooltip placement="bottom" target={`case-addarbs-btn-${casefile.case_id}`}>
          //     Add Arbitrators
          //   </UncontrolledTooltip>

          // </Button>
          // }
          // {this.isArbitrator() && casefile.case_status >= 2 && casefile.case_status <= 6 &&
          // <Button id={`case-recuse-btn-${casefile.case_id}`} color="info" onClick={this.onRecuse(casefile)}>
          //   <i className="fas fa-user-minus"></i>
          //   <UncontrolledTooltip placement="bottom" target={`case-recuse-btn-${casefile.case_id}`}>
          //     Recuse
          //   </UncontrolledTooltip>
          // </Button>
          // }
          // {this.isArbitrator() &&
          // <Button id={`case-edit-btn-${casefile.case_id}`} color="info" onClick={this.onEdit(casefile)}>
          //   <i className="fas fa-user-edit"></i>
          //   <UncontrolledTooltip placement="bottom" target={`case-edit-btn-${casefile.case_id}`}>
          //     Edit Case
          //   </UncontrolledTooltip>
          // </Button>
          // }


      //   </td>
      // </Row>,
      // <Row key="caseactions">
      //   <td>
      //     {casefile.claims.length > 0 ?
      //       <Button color={this.state.caseClaimsOpen[casefile.case_id] ? 'warning' : 'info'} onClick={() => this.openCaseClaims(casefile.case_id)}>
      //         {this.state.caseClaimsOpen[casefile.case_id] ? '-' : '+'}
      //       </Button>
      //       :
      //       'No Claims'
      //     }
      //   </td>
      //   <td>
      //     {this.isClaimant() && casefile.case_status === 0  &&
      //     <Button color="primary" onClick={this.onAddClaim(casefile)}>Add Claim</Button>
      //     }
      //   </td>
      //   <td align="right">
      //     {this.isClaimant() && casefile.case_status === 0 &&
      //     <Button color="success" onClick={this.onSubmitCasefile(casefile)}>Submit for Arbitration</Button>
      //     }
      //   </td>
      //   <td/>
      //   <td/>
      //   {this.props.caseType !== 'claimant'   && <td/>}
      //   {this.props.caseType !== 'respondant' && <td/>}
      //   <td/>
      // </Row>,
      // this.state.caseClaimsOpen[casefile.case_id] &&
      // <Row key="claims">
      //   <td colSpan={7 - ((this.props.caseType === 'claimant' || this.props.caseType === 'respondant') ? 1 : 0)}>
      //     <ClaimsTable casefile={casefile} caseType={this.props.caseType} />
      //   </td>
      // </Row>,
    ];

  }

  render() {

    return (
      <div className="cases-table">
        <Row className="table-title">
          <Col>
            {this.props.caseType === 'claimant'   && "My Cases"}
            {this.props.caseType === 'respondant' && "Respondent Cases"}
            {this.props.caseType === 'arbitrator' && "Arbitrator Cases"}
          </Col>
          <Col>
            {this.props.caseType === 'claimant' &&
            <Button color="light" onClick={this.onNewCase()} className="new-case-btn" style={{marginRight: '20px'}}>
              <i className="fas fa-plus fas-left"></i>
              New Case
            </Button>
            }
            {this.props.caseType === 'arbitrator' &&
            <Button color="light" onClick={this.openArbitratorsSettings()} className="new-case-btn" style={{marginRight: '20px'}}>
              <i class="fas fa-user-cog"></i> Arbitrator Settings
            </Button>
            }
          </Col>
        </Row>

        <Container className="cases-table">

          {/* <Jumbotron className="members-home-jumbo scroll-x"> */}

            {/* <Table className="cases-table-data"> */}
              {/* <thead>
              <tr>
                <th sm="1">Case ID</th>
                <th sm="1">Status</th>
                <th sm="3">Arbitrators</th>
                <th sm="3">Approvals</th>
                {this.props.caseType !== 'claimant' &&
                <th>
                  Claimant
                </th>
                }
                {this.props.caseType !== 'respondant' &&
                <th>
                  Respondent
                </th>
                }
                <th sm="4" style={{textAlign: 'right'}}>Actions</th>
              </tr>
              </thead>
              <tbody> */}
              {this.props.cases.map(this.renderCase.bind(this))}
              {/* </tbody> */}
            {/* </Table> */}

          {/* </Jumbotron> */}

        </Container>
      </div>
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
