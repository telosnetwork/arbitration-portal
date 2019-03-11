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
        claim_link: {
          label: 'Claim Link:',
          value: '',
          type: 'text',
          placeholder: 'ipfs_link',
          text: 'Please input a valid IPFS link'
        },
        lang_codes: {
          label: 'Language Codes:',
          value: '',
          type: 'checkbox',
          placeholder: '',
          text: 'Please select from the following language codes'
        },
        respondant: {
          label: 'Respondant:',
          value: '',
          type: 'text',
          placeholder: 'account_name',
          text: 'Please input a valid TELOS account name'
        }
      },
      addclaim: {
        claim_link: {
          label: 'Claim Link:',
          value: '',
          type: 'text',
          placeholder: 'ipfs_link',
          special: 'ipfs',
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

  handleSubmit(event, actionName) {

  }

  renderAutoInput(formElement) {

    switch(formElement.special) {
      case 'ipfs': {
        return <IPFSInput/>;
      }
    }

    return (
      <Input type={formElement.type} value={formElement.value} placeholder={formElement.placeholder}
             onChange={(event) => this.inputChangedHandler(event, this.props.actionName, formElement.id)}/>
    );

  }

  renderAutoForm() {
    const { actionName } = this.props;

    const form = this.formArrays[actionName];

    return form.map(formElement => (
      <FormGroup key={formElement.id} row>
        <Label for={formElement.id} sm={1}>{formElement.label}</Label>
        <Col sm={11}>
          {this.renderAutoInput(formElement)}
          <FormFeedback>...</FormFeedback>
          {formElement.text && <FormText>{formElement.text}</FormText>}
        </Col>
      </FormGroup>
    ));
  }

  renderFileCaseForm() {
    return [
      this.renderAutoForm(),
    ];
  }

  renderForm(actionName) {
    switch (actionName) {
      case 'addclaim': {
        return this.renderFileCaseForm();
      }
    }
  }

  render() {

    const { actionName } = this.props;
    if(!actionName) return null;

    return (
      <div>
        <ModalHeader toggle={this.props.toggle}>{actionName}</ModalHeader>
        <ModalBody>
          <Form onSubmit={(event) => this.handleSubmit(event, actionName)}>
            {this.renderForm(actionName)}
            {this.state.loading && <Spinner className='submitSpinner' type='grow' color='primary' />}
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button className='submitButton' color='primary' onClick={(event) => this.handleSubmit(event, actionName)}>Submit</Button>
          <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
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
