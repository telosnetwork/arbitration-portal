import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Components
import IPFSInput from '../../components/IPFSInput';
import { Container, Row, ModalHeader, ModalBody, ModalFooter, Col, Button, Spinner, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

// Redux
import { connect }               from 'react-redux';
import { CasesActions } from 'business/actions';
import { CasesSelectors, ClaimsSelectors } from 'business/selectors';

const languageCodes = {
  ENGL: '0',
  FRCH: '1',
  GRMN: '2',
  KREA: '3',
  JAPN: '4',
  CHNA: '5',
  SPAN: '6',
  PGSE: '7',
  SWED: '8'
};
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
      value: '',
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
};

class MembersModal extends Component {

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

  handleSubmit() {
    return () => {

      // TODO handle loading and closing of the modal

      const payload = {
        ...this.state.formValues,
      };

      if (this.props.case) {
        payload.case_id = this.props.case.case_id;
      }
      if (this.props.claim) {
        payload.claim_id = this.props.claim.claim_id;
      }

      switch (this.props.actionName) {
        case 'filecase': {
          const caseData = {
            ...payload,
            lang_codes: [this.state.formValues.lang_codes || '0'] // TODO fix multiple selector
          };
          this.props.fileCase(caseData);
          break;
        }
        case 'addclaim': {
          this.props.addClaim(payload);
          break;
        }
        case 'deletecase': {
          this.props.deleteCase(payload.case_id);
          break;
        }
        case 'deleteclaim': {
          this.props.deleteClaim(payload.case_id, payload.claim_id);
          break;
        }
        case 'readycase': {
          this.props.readyCase(payload.case_id);
          break;
        }
        case 'respondclaim': {
          this.props.respondClaim(payload);
          break;
        }
        default: {
          throw new Error('Unknown action to handle');
        }
      }

    };
  }

  renderAutoInput(formElement) {

    switch(formElement.special) {
      case 'ipfs': {
        return (
          <IPFSInput
            name={formElement.id}
            onChange={this.inputChangedHandler(formElement.id)}
          />
        );
      }
      case 'languages': {
        return (
          <Input
            type="select"
            name="formElement.id"
            multiple
            onChange={this.inputChangedHandler(formElement.id)}
          >
            {Object.keys(languageCodes).map(language =>
              <option key={language} value={languageCodes[language]}>{language}</option>
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

  renderFileCaseForm() {
    return [
      this.renderAutoForm(),
    ];
  }

  renderAddCaseForm() {
    return [
      this.renderAutoForm(),
    ];
  }

  renderDeleteCase() {
    return [
      this.renderAutoForm(),
    ];
  }

  renderRespondClaim() {
    return [
      this.renderAutoForm(),
    ];
  }

  renderForm(actionName) {
    switch (actionName) {
      case 'filecase': {
        return this.renderFileCaseForm();
      }
      case 'addclaim': {
        return this.renderAddCaseForm();
      }
      case 'deletecase': {
        return this.renderDeleteCase();
      }
      case 'respondclaim': {
        return this.renderRespondClaim();
      }
      default: {
        return null;
      }
    }
  }

  getTitle() {
    switch (this.props.actionName) {
      case 'filecase': {
        return 'Create new case';
      }
      case 'addclaim': {
        return 'Add a new claim';
      }
      case 'deletecase': {
        return 'Are you sure you want to delete this case ?';
      }
      case 'deleteclaim': {
        return 'Are you sure you want to delete this claim ?';
      }
      case 'readycase': {
        return 'Ready case';
      }
      case 'respondclaim': {
        return 'Respond to claim';
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
            <Col sm={10}>
              {this.getTitle()}
            </Col>
            {this.props.case &&
            <Col sm={2}>
              Case #{this.props.case.case_id}
            </Col>
            }
          </Row>
        </Container>
      </ModalHeader>,
      this.props.case && // TODO change styling of that
      <ModalBody key="information">
        <Container>
          <Row>
            Case status: {this.props.case.case_status}
          </Row>
          {this.props.claim &&
          <Row>
            Claim ID: {this.props.claim.claim_id}
            <br/>
            Claim status: {this.props.claim.claim_id}
          </Row>
          }
        </Container>
      </ModalBody>
    ];
  }

  render() {

    const { actionName } = this.props;
    if(!actionName) return null;

    const rendered = [];
    rendered.push(...this.renderHeader());

    if(actionName === 'filecase' || actionName === 'addclaim' || actionName === 'respondclaim') {

      rendered.push(
        <ModalBody key="form">
          <Form onSubmit={this.handleSubmit()}>
            {this.renderForm(actionName)}
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
    else if (actionName === 'deletecase' || actionName === 'deleteclaim') {

      rendered.push(
        <ModalFooter key="footer">
          <Button color="info" onClick={this.props.cancel}>No</Button>
          <Button color='danger' onClick={this.handleSubmit()}>Yes</Button>
        </ModalFooter>
      );

    }
    else if (actionName === 'readycase') {

      rendered.push(
        <ModalBody key="description">
          In order to ready the case, you need to make a deposit of 100 TLOS.
        </ModalBody>
      );
      rendered.push(
        <ModalFooter key="footer">
          <Button color="info" onClick={this.props.cancel}>Cancel</Button>
          <Button color='success' onClick={this.handleSubmit()}>Deposit</Button>
        </ModalFooter>
      );

    }

    return rendered;

  }

}

MembersModal.propTypes = {
  actionName: PropTypes.string,
  case: PropTypes.object,
  claim: PropTypes.object,
  cancel: PropTypes.func,
  fileCase: PropTypes.func,
};

const mapStateToProps = state => ({
  case: CasesSelectors.getSelectedCase(state),
  claim: ClaimsSelectors.getSelectedClaim(state),
});

const mapDispatchToProps = {
  fileCase: CasesActions.fileCase,
  addClaim: CasesActions.addClaim,
  deleteCase: CasesActions.deleteCase,
  deleteClaim: CasesActions.deleteClaim,
  readyCase: CasesActions.readyCase,
  respondClaim: CasesActions.respondClaim,
};

// Export a redux connected component
export default connect(mapStateToProps, mapDispatchToProps)(MembersModal);
