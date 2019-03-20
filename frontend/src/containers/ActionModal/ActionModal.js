import React, { Component } from 'react';

// Components
import IPFSInput from '../../components/IPFSInput';
import { Modal, Container, Row, ModalHeader, ModalBody, ModalFooter, Col, Button, Spinner, Form, FormGroup, Label, Input, FormText, ListGroup, ListGroupItem } from 'reactstrap';

// Redux
import { connect }               from 'react-redux';
import { CasesActions, ClaimsActions, ModalActions } from 'business/actions';
import { ArbitratorsSelectors, CasesSelectors, ClaimsSelectors, ModalSelectors } from 'business/selectors';

import CaseStatus from 'const/CaseStatus';
import DecisionClass from 'const/DecisionClass';
import LanguageCodes from 'const/LanguageCodes';
import ArbStatus from 'const/ArbStatus';

const forms = {
  filecase: {
    respondant: {
      label: 'Respondant:',
      value: '',
      type: 'text',
      placeholder: 'account_name',
      text: 'Please input a valid TELOS account name'
    },
    claim_link: {
      label: 'Claim file:',
      placeholder: 'ipfs_link',
      special: 'ipfs',
      text: 'Please select a file to upload'
    },
    lang_codes: {
      label: 'Language Codes:',
      value: [],
      special: 'languages',
      text: 'Please select from the following language codes'
    },
  },
  addclaim: {
    claim_link: {
      label: 'Claim file:',
      placeholder: 'ipfs_link',
      special: 'ipfs',
      text: 'Please select a file to upload'
    }
  },
  respondclaim: {
    response_link: {
      label: 'Response file:',
      placeholder: 'ipfs_link',
      special: 'ipfs',
      text: 'Please select a file to upload'
    }
  },
  acceptclaim: {
    decision_link: {
      label: 'Decision file:',
      placeholder: 'ipfs_link',
      special: 'ipfs',
      text: 'Please select a file to upload'
    },
    decision_class: {
      label: 'Decision class:',
      placeholder: 'decision_class',
      special: 'decision_class',
      text: 'Please set a decision class'
    }
  },
  dismissclaim: {
    memo: {
      label: 'Memo:',
      placeholder: 'memo',
      type: 'text',
      text: 'Please provide a note'
    }
  },
  addarbs: {
    num_arbs_to_assign: {
      label: 'Arbs to assign:',
      value: 1,
      type: 'text',
      placeholder: 'num_arbs_to_assign',
      text: 'Please input the number of arbitrators to assign'
    }
  },
  setruling: {
    case_ruling: {
      label: 'Ruling file:',
      placeholder: 'ipfs_link',
      special: 'ipfs',
      text: 'Please select a file to upload'
    }
  },
  recuse: {
    rationale: {
      label: 'Rationale:',
      placeholder: 'rationale',
      type: 'text',
      text: 'Please provide a rationale for recusing'
    }
  },
  arbitratorsettings: {
    new_status: {
      label: 'Availability',
      special: 'arb_status',
      text: 'Please select your availability'
    },
    lang_codes: {
      label: 'Language Codes:',
      value: [],
      special: 'languages',
      text: 'Please select from the following language codes'
    },
  },
  dismisscase: {
    ruling_link: {
      label: 'Ruling file:',
      placeholder: 'ipfs_link',
      special: 'ipfs',
      text: 'Please select a file to upload'
    }
  },
};

class ActionModal extends Component {

  constructor(props) {
    super(props);

    this.formArrays = Object.keys(forms).reduce(
      (accForms, formName) => ({
        ...accForms,
        [formName]: Object.keys(forms[formName]).reduce(
          (accForm, key) => accForm.concat({
            id: key,
            label: forms[formName][key].label,
            value: forms[formName][key].value,
            type: forms[formName][key].type,
            placeholder: forms[formName][key].placeholder,
            text: forms[formName][key].text,
            special: forms[formName][key].special,
          }),
          []
        )
      }),
      {}
    );

    this.state = {
      form: [],
      formValues: {},
    };

  }

  componentDidMount() {
    this.updateForm();
  }

  componentDidUpdate(oldProps) {
    if(oldProps.actionName !== this.props.actionName) {
      this.updateForm();
    }
  }

  close() {
    return () => {
      this.props.setAction(null);
      this.props.setSelectedCase(null);
      this.props.setSelectedClaim(null);
    }
  }

  updateForm() {

    const form = this.formArrays[this.props.actionName];

    if(form) {

      const formValues = form.reduce((acc, formElement) =>
          ({
            ...acc,
            [formElement.id]: formElement.value || '',
          }),
        {}
      );

      if(this.props.actionName === 'arbitratorsettings') {
        formValues.new_status = this.props.arbitrator.arb_status || 0;
        formValues.lang_codes = this.props.arbitrator.languages || [];
      }

      this.setState({
        form,
        formValues,
      });

    }

  }

  inputChangedHandler(formElementId) {
    return event => {
      this.setState({
        formValues: {
          ...this.state.formValues,
          [formElementId]: event.target.value,
        },
      });
    };
  }

  checkboxChangedHandler(formElementId) {
    return event => {

      const oldArray = this.state.formValues[formElementId];
      const newArray = [].concat(oldArray);
      const clickedValue = parseInt(event.target.value);
      const existingIndex = oldArray.indexOf(clickedValue);
      if(existingIndex !== -1) {
        newArray.splice(existingIndex, 1);
      } else {
        newArray.push(clickedValue);
      }

      this.setState({
        formValues: {
          ...this.state.formValues,
          [formElementId]: newArray,
        },
      });

    };
  }

  handleSubmit() {
    return () => {

      const formValues = this.state.formValues || {};
      this.props.executeAction(this.props.actionName, formValues);

    };
  }

  renderAutoInput(formElement) {

    switch(formElement.special) {
      case 'ipfs': {
        return (
          <IPFSInput
            name={formElement.id}
            value={this.state.formValues[formElement.id]}
            onChange={this.inputChangedHandler(formElement.id)}
          />
        );
      }
      case 'languages': {

        return Object.keys(LanguageCodes).map(language =>
          <div key={`lg-select-${language}`}>
            <Input
              type="checkbox"
              name={formElement.id}
              value={LanguageCodes[language]}
              id={`lg-select-${language}`}
              onChange={this.checkboxChangedHandler(formElement.id)}
              checked={this.state.formValues[formElement.id].includes(LanguageCodes[language])}
            />
            <Label for={`lg-select-${language}`} check>{language}</Label>
          </div>
        );

      }
      case 'decision_class': {

        return (
          <Input
            type="select"
            name={formElement.id}
            onChange={this.inputChangedHandler(formElement.id)}
            value={this.state.formValues[formElement.id]}
          >
            {Object.keys(DecisionClass).map(classId =>
              <option
                key={classId}
                value={classId}
              >
                {DecisionClass[classId]}
              </option>
            )}
          </Input>
        );

      }
      case 'arb_status': {

        return (
          <Input
            type="select"
            name={formElement.id}
            onChange={this.inputChangedHandler(formElement.id)}
            value={this.state.formValues[formElement.id]}
          >
            {Object.keys(ArbStatus).filter(s => parseInt(s) <= 1).map(statusId =>
              <option
                key={statusId}
                value={statusId}
              >
                {ArbStatus[statusId]}
              </option>
            )}
          </Input>
        );

      }
      default: {
        return (
          <Input
            name={formElement.id}
            type={formElement.type}
            value={this.state.formValues[formElement.id]}
            placeholder={formElement.placeholder}
            onChange={this.inputChangedHandler(formElement.id)}
          />
        );
      }
    }

  }

  renderAutoForm() {
    return this.state.form.map(formElement => (
      <FormGroup key={formElement.id} row>
        <Label key={formElement.id} sm={4}>
          {formElement.label}
        </Label>
        <Col sm={8}>
          {this.renderAutoInput(formElement)}
          {formElement.text && <FormText color="muted">{formElement.text}</FormText>}
        </Col>
      </FormGroup>
    ));
  }

  getTitle() {
    switch (this.props.actionName) {
      case 'filecase': {
        return 'Create new case';
      }
      case 'addclaim': {
        return 'Add a new claim';
      }
      case 'shredcase': {
        return 'Are you sure you want to shred this case ?';
      }
      case 'removeclaim': {
        return 'Are you sure you want to remove this claim ?';
      }
      case 'submitcasefile': {
        return 'Submit case for arbitration';
      }
      case 'respondclaim': {
        return 'Respond to claim';
      }
      case 'acceptclaim': {
        return 'Accept claim';
      }
      case 'dismissclaim': {
        return 'Dismiss claim';
      }
      case 'arbitratorsettings': {
        return 'Arbitrator settings';
      }
      case 'setruling': {
        return 'Set ruling';
      }
      case 'addarbs': {
        return 'Add arbitrators';
      }
      case 'recuse': {
        return 'Are you sure you want to recuse from the case ?';
      }
      case 'editcase': {
        return 'Edit case';
      }
      case 'advancecase': {
        return 'Are you sure you want to advance this case ?';
      }
      case 'dismisscase': {
        return 'Dismiss case';
      }
      default: {
        return '';
      }
    }
  }

  renderHeader() {
    return [
      <ModalHeader key="header" toggle={this.props.toggle}>
        <Container>
          <Row>
            <Col sm={7}>
              {this.getTitle()}
            </Col>
            {this.props.casefile &&
            <Col sm={5} style={{textAlign: 'end'}}>
              Case #{this.props.casefile.case_id} &nbsp;
              <i className="case-status text-muted">({CaseStatus[this.props.casefile.case_status]})</i>
            </Col>
            }
          </Row>
        </Container>
      </ModalHeader>,
      this.props.claim && // TODO change styling of that
      <ModalBody key="information">
        <Container>
          <Row>
            Claim ID: {this.props.claim.claim_id}
            <br/>
            Claim status: {this.props.claim.claim_status}
            <br/>
            Claim hash: {this.props.claim.claim_summary}
          </Row>
        </Container>
      </ModalBody>
    ];
  }

  changeAction(actionName) {
    return () => {
      this.props.setAction(actionName);
    };
  }

  renderContent() {

    const { actionName } = this.props;
    if(!actionName) return null;

    if(this.props.actionLoading) {
      return (
        <div>
          <ModalHeader>
            Sending transaction ...
          </ModalHeader>
          <ModalBody className="loading-body">
            <Spinner className="spinner" />
          </ModalBody>
        </div>
      );
    }

    const rendered = [];
    rendered.push(...this.renderHeader());

    // Actions with form
    if(actionName === 'filecase' || actionName === 'addclaim' || actionName === 'respondclaim' || actionName === 'setruling' || actionName === 'addarbs' || actionName === 'recuse' || actionName === 'acceptclaim' || actionName === 'dismissclaim' || actionName === 'arbitratorsettings' || actionName === 'dismisscase') {

      rendered.push(
        <ModalBody key="form">
          <Form onSubmit={this.handleSubmit()}>
            {this.renderAutoForm()}
            {this.state.loading && <Spinner className='submitSpinner' type='grow' color='primary' />}
          </Form>
        </ModalBody>
      );
      rendered.push(
        <ModalFooter key="footer">
          <Button color="secondary" onClick={this.close()}>Cancel</Button>
          <Button color='primary' onClick={this.handleSubmit()}>Submit</Button>
        </ModalFooter>
      );

    }
    // Actions with only yes/no
    else if (actionName === 'shredcase' || actionName === 'removeclaim' || actionName === 'advancecase') {

      rendered.push(
        <ModalFooter key="footer">
          <Button color="info" onClick={this.close()}>No</Button>
          <Button color='danger' onClick={this.handleSubmit()}>Yes</Button>
        </ModalFooter>
      );

    }
    // Submit case
    else if (actionName === 'submitcasefile') {

      // TODO get and display account's balance on the contract
      rendered.push(
        <ModalBody key="description">
          In order to ready the case, you need to make a deposit of 100 TLOS.
          <br/>
          If your balance on the contract is lower than 100 TLOS, a transfer will automatically be created.
        </ModalBody>
      );
      rendered.push(
        <ModalFooter key="footer">
          <Button color="info" onClick={this.close()}>Cancel</Button>
          <Button color='success' onClick={this.handleSubmit()}>Submit</Button>
        </ModalFooter>
      );

    }
    // Edit case
    else if (actionName === 'editcase') {

      const { casefile } = this.props;
      rendered.push(
        <ModalBody key="description">
          <Row>
            <Col>
              <h4>Arbitrator approvals</h4>

              <ListGroup>
                {casefile.arbitrators.map(arbitrator =>
                  <ListGroupItem
                    key={arbitrator}
                    color={casefile.approvals.find(a => a === arbitrator) ? 'success' : ''}
                  >
                    {arbitrator}
                  </ListGroupItem>
                )}
              </ListGroup>
            </Col>
            <Col>
              <h4>Case status</h4>

              <ListGroup>
                {Object.keys(CaseStatus).map(s =>
                  <ListGroupItem
                    key={s}
                    color={casefile.case_status === parseInt(s) ? 'success' : null}
                  >
                    {CaseStatus[s]}
                  </ListGroupItem>
                )}
              </ListGroup>
            </Col>
          </Row>
        </ModalBody>
      );
      rendered.push(
        <ModalFooter key="footer">
          <Button color="info" onClick={this.close()}>Close</Button>
          {casefile.case_status === 2 && <Button color='warning' onClick={this.changeAction('dismisscase')}>Dismiss case</Button>}
          {casefile.case_status >= 2 && casefile.case_status <= 6 &&
          <Button color='success' onClick={this.changeAction('advancecase')}>Advance case</Button>
          }
        </ModalFooter>
      );

    }

    return rendered;

  }
  render() {
    return (
      <Modal
        isOpen={!!this.props.modalAction}
        toggle={this.close()}
        centered
      >
        {this.renderContent()}
      </Modal>
    );
  }

}

const mapStateToProps = state => ({
  modalAction: ModalSelectors.action(state),
  actionName: ModalSelectors.action(state),
  actionLoading: ModalSelectors.actionLoading(state),
  casefile: CasesSelectors.getSelectedCase(state),
  claim: ClaimsSelectors.getSelectedClaim(state),
  arbitrator: ArbitratorsSelectors.arbitrator(state),
});

const mapDispatchToProps = {
  executeAction: ModalActions.executeAction,
  setSelectedCase: CasesActions.setSelectedCase,
  setSelectedClaim: ClaimsActions.setSelectedClaim,
  setAction: ModalActions.setAction,
};

// Export a redux connected component
export default connect(mapStateToProps, mapDispatchToProps)(ActionModal);
