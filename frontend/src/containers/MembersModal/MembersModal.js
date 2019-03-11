import React, { Component }      from 'react';

// Components
import IPFSInput                  from '../../components/IPFSInput';
import { ModalHeader, ModalBody, ModalFooter, Col, Button, Spinner, Form, FormGroup, Label, CustomInput, Input, FormText, FormFeedback  } from 'reactstrap';

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
      withdraw: {
        owner: {
          label: 'Owner:',
          value: '',
          type: 'text',
          placeholder: 'account_name',
          text: 'Please input a valid TELOS account name'
        }
      },
      filecase: {
        respondant: {
          label: 'Respondant:',
          value: '',
          type: 'text',
          placeholder: 'account_name',
          text: 'Please input a valid TELOS account name'
        },
        claim_link: {
          label: 'Claim Link:',
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
          label: 'Claim Link:',
          placeholder: 'ipfs_link',
          special: 'ipfs',
          text: 'Please select a file to upload'
        }
      },
      removeclaim: {
        case_id: {
          label: 'Case ID:',
          value: '',
          type: 'number',
          placeholder: '0',
          text: 'Please input a valid case ID'
        },
        claimant: {
          label: 'Claimant:',
          value: '',
          type: 'text',
          placeholder: 'account_name',
          text: 'Please input a valid TELOS account name'
        },
        claim_hash: {
          label: 'Claim Hash:',
          value: '',
          type: 'text',
          placeholder: 'ipfs_link',
          text: 'Please input a valid IPFS link'
        }
      },
      shredcase: {
        case_id: {
          label: 'Case ID:',
          value: '',
          type: 'number',
          placeholder: '0',
          text: 'Please input a valid case ID'
        },
        claimant: {
          label: 'Claimant:',
          value: '',
          type: 'text',
          placeholder: 'account_name',
          text: 'Please input a valid TELOS account name'
        },
      },
      readycase: {
        case_id: {
          label: 'Case ID:',
          value: '',
          type: 'number',
          placeholder: '0',
          text: 'Please input a valid case ID'
        },
        claimant: {
          label: 'Claimant:',
          value: '',
          type: 'text',
          placeholder: 'account_name',
          text: 'Please input a valid TELOS account name'
        },
      }
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
    }

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

  renderForm(actionName) {
    switch (actionName) {
      case 'filecase': {
        return this.renderFileCaseForm();
      }
      case 'addclaim': {
        return this.renderAddCaseForm();
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
    }
    return '';
  }

  render() {

    const { actionName } = this.props;
    if(!actionName) return null;

    return (
      <div>
        <ModalHeader toggle={this.props.toggle}>{this.getTitle()}</ModalHeader>
        <ModalBody>
          <Form onSubmit={(event) => this.handleSubmit(event, actionName)}>
            {this.renderForm(actionName)}
            {this.state.loading && <Spinner className='submitSpinner' type='grow' color='primary' />}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
          <Button className='submitButton' color='primary' onClick={(event) => this.handleSubmit(event, actionName)}>Submit</Button>
        </ModalFooter>
      </div>
    );
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
