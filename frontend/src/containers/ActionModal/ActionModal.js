import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import IPFSInput from '../../components/IPFSInput';
import { Container, Row, ModalHeader, ModalBody, ModalFooter, Col, Button, Spinner, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

// Redux
import { connect }               from 'react-redux';
import { ModalActions } from 'business/actions';
import { CasesSelectors, ClaimsSelectors, ModalSelectors } from 'business/selectors';

import CaseStatus from 'const/CaseStatus';
import DecisionClass from 'const/DecisionClass';
import LanguageCodes from 'const/LanguageCodes';

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
      value: 0,
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

    this.form = this.formArrays[this.props.actionName];

    if(this.form) {

      const defaultFormValues = this.form.reduce((acc, formElement) =>
          ({
            ...acc,
            [formElement.id]: formElement.value || '',
          }),
        {}
      );

      this.state = {
        formValues: defaultFormValues,
      };

    } else {
      this.state = {};
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
      const clickedValue = event.target.value;
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
    return this.form.map(formElement => (
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
            {this.props.case &&
            <Col sm={5} style={{textAlign: 'end'}}>
              Case #{this.props.case.case_id} &nbsp;
              <i className="case-status text-muted">({CaseStatus[this.props.case.case_status]})</i>
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

  render() {

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
    if(actionName === 'filecase' || actionName === 'addclaim' || actionName === 'respondclaim' || actionName === 'setruling' || actionName === 'addarbs' || actionName === 'recuse' || actionName === 'acceptclaim' || actionName === 'dismissclaim') {

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
          <Button color="secondary" onClick={this.props.cancel}>Cancel</Button>
          <Button color='primary' onClick={this.handleSubmit()}>Submit</Button>
        </ModalFooter>
      );

    }
    // Actions with only yes/no
    else if (actionName === 'shredcase' || actionName === 'removeclaim') {

      rendered.push(
        <ModalFooter key="footer">
          <Button color="info" onClick={this.props.cancel}>No</Button>
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
          <Button color="info" onClick={this.props.cancel}>Cancel</Button>
          <Button color='success' onClick={this.handleSubmit()}>Submit</Button>
        </ModalFooter>
      );

    }
    // Arbitrators settings
    else if (actionName === 'arbitratorsettings') {

      rendered.push(
        <ModalFooter key="footer">
          <Button color="info" onClick={this.props.cancel}>Done</Button>
        </ModalFooter>
      );

    }

    return rendered;

  }

}

ActionModal.propTypes = {
  actionName: PropTypes.string,
  case: PropTypes.object,
  claim: PropTypes.object,
  cancel: PropTypes.func,
  fileCase: PropTypes.func,
};

const mapStateToProps = state => ({
  case: CasesSelectors.getSelectedCase(state),
  actionLoading: ModalSelectors.actionLoading(state),
  claim: ClaimsSelectors.getSelectedClaim(state),
});

const mapDispatchToProps = {
  executeAction: ModalActions.executeAction,
};

// Export a redux connected component
export default connect(mapStateToProps, mapDispatchToProps)(ActionModal);
