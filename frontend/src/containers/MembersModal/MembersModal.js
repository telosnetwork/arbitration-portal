import React, { Component }      from 'react';
import axios                     from 'axios';

// Utilities
import ScatterBridge             from '../../utils/scatterBridge';
// import IOClient               from '../../utils/io-client';
// import { updateBalances }     from '../../utils/updateBalances';
// import { updateCases }        from '../../utils/updateCases';

// Components
import Uploader                  from '../Uploader';
import BlockConsole              from '../BlockConsole';

// Redux
import { connect }               from 'react-redux';
import { AuthenticationActions } from 'business/actions';

import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames    from 'classnames';
import { Button, Spinner, Form, FormGroup, Label, CustomInput, Input, FormText, FormFeedback } from 'reactstrap';
import { Jumbotron } from 'reactstrap';

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
        claimant: {
          label: 'Claimant:',
          value: '',
          type: 'text',
          placeholder: 'account_name',
          text: 'Please input a valid TELOS account name'
        },
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
        case_id: {
          label: 'Case ID:',
          value: '',
          type: 'number',
          placeholder: '0',
          text: 'Please input a valid case ID',
        },
        claimant: {
          label: 'Claimant:',
          value: '',
          type: 'text',
          placeholder: 'account_name',
          text: 'Please input a valid TELOS account name'
        },
        claim_link: {
          label: 'Claim Link:',
          value: '',
          type: 'text',
          placeholder: 'ipfs_link',
          text: 'Please input a valid IPFS link',
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

  renderForm(actionName) {

    const form = this.formArrays[actionName];

    return form.map(formElement => (
      <FormGroup className='formgroup' key={formElement.id} row>
        <Label for={formElement.id} sm={1}>{formElement.label}</Label>
        <Col sm={11}>
          <div>
            <Input type={formElement.type} value={formElement.value} placeholder={formElement.placeholder}
                   onChange={(event) => this.inputChangedHandler(event, actionName, formElement.id)}/>
            {formElement.special === 'ipfs' ? <Uploader/> : null }
          </div>
          <FormFeedback>...</FormFeedback>
          <FormText>{formElement.text}</FormText>
        </Col>
      </FormGroup>
    ));

  }

  render() {

    const { actionName } = this.props;

    return (
      <Row>
        <Col sm='12'>
          <Form onSubmit={(event) => this.handleSubmit(event, actionName)}>
            {this.renderForm(actionName)}
            {this.state.loading && <Spinner className='submitSpinner' type='grow' color='primary' />}
            <Button className='submitButton' color='primary' onClick={(event) => this.handleSubmit(event, actionName)}>Submit</Button>
          </Form>
        </Col>
      </Row>
    );
  }

}

const mapStateToProps = state => ({
});

const mapDispatchToProps = {
};

// Export a redux connected component
export default connect(mapStateToProps, mapDispatchToProps)(MembersModal);
