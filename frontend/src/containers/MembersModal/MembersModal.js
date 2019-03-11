import React, { Component }      from 'react';

// Components
import IPFSInput                  from '../../components/IPFSInput';
import { Container, Row, ModalHeader, ModalBody, ModalFooter, Col, Button, Spinner, Form, FormGroup, Label, Input, FormText  } from 'reactstrap';

// Redux
import { connect }               from 'react-redux';
import { CasesSelectors, ClaimsSelectors } from 'business/selectors';


class MembersModal extends Component {

  constructor(props) {
    super(props);

    this.state = {};

    this.languageCodes = {
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

    /**
     * Member Actions Form Builder
     */

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

  }

  inputChangedHandler(){

  }

  handleSubmit(event, actionName) {

  }

  renderAutoInput(formElement) {

    switch(formElement.special) {
      case 'ipfs': {
        return <IPFSInput/>;
      }
      case 'languages': {
        return (
          <Input
            type="select"
            name="formElement.id"
            multiple
          >
            {Object.keys(this.languageCodes).map(language =>
              <option key={language} value={this.languageCodes[language]}>{language}</option>
            )}
          </Input>
        );
      }
      default: {
        return (
          <Input
            name={formElement.id}
            type={formElement.type}
            value={formElement.value}
            placeholder={formElement.placeholder}
            onChange={(event) => this.inputChangedHandler(event, this.props.actionName, formElement.id)}
          />
        );
      }
    }

  }

  renderAutoForm() {
    const { actionName } = this.props;

    const form = this.formArrays[actionName];

    return form.map(formElement => (
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
        {this.getTitle()}
      </ModalHeader>,
      this.props.case &&
      <ModalBody key="information">
        <Container>
          <Row><Col>
            Case ID: {this.props.case.case_id}
            <br/>
            Case status: {this.props.case.case_status}
          </Col></Row>
          {this.props.claim &&
          <Row><Col>
            Claim ID: {this.props.claim.claim_id}
            <br/>
            Claim status: {this.props.claim.claim_id}
          </Col></Row>
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
          <Form onSubmit={(event) => this.handleSubmit(event, actionName)}>
            {this.renderForm(actionName)}
            {this.state.loading && <Spinner className='submitSpinner' type='grow' color='primary' />}
          </Form>
        </ModalBody>
      );
      rendered.push(
        <ModalFooter key="footer">
          <Button color="secondary" onClick={this.props.cancel}>Cancel</Button>
          <Button color='primary' onClick={(event) => this.handleSubmit(event, actionName)}>Submit</Button>
        </ModalFooter>
      );

    }
    else if (actionName === 'deletecase' || actionName === 'deleteclaim') {

      rendered.push(
        <ModalFooter key="footer">
          <Button color="info" onClick={this.props.cancel}>No</Button>
          <Button color='danger' onClick={(event) => this.handleSubmit(event, actionName)}>Yes</Button>
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
          <Button color='success' onClick={(event) => this.handleSubmit(event, actionName)}>Deposit</Button>
        </ModalFooter>
      );

    }

    return rendered;

  }

}

const mapStateToProps = state => ({
  case: CasesSelectors.getSelectedCase(state),
  claim: ClaimsSelectors.getSelectedClaim(state),
});

const mapDispatchToProps = {
};

// Export a redux connected component
export default connect(mapStateToProps, mapDispatchToProps)(MembersModal);
