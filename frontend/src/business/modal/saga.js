import { put, takeEvery, select } from 'redux-saga/effects';
import { ActionTypes }    from 'const';

import * as actions from './actions';
import { AuthenticationSelectors, CasesSelectors, ClaimsSelectors } from '../selectors';
import { ArbitratorsActions, CasesActions, ClaimsActions } from '../actions';

export function* finishAction() {

  yield put(actions.setAction(null));
  yield put(actions.setActionLoading(false));
  yield put(CasesActions.setSelectedCase(null));
  yield put(ClaimsActions.setSelectedClaim(null));

}

export function* executeAction({ actionName, actionData }) {

  yield put(actions.setActionLoading(true));

  const account = yield select(AuthenticationSelectors.account);
  if(!account) throw new Error('Must be logged in first to execute action');

  const arbitrationContract = yield select(AuthenticationSelectors.arbitrationContract);
  const casefile = yield select(CasesSelectors.getSelectedCase);
  const claim = yield select(ClaimsSelectors.getSelectedClaim);

  switch(actionName) {
    case 'filecase': {

      yield arbitrationContract.fileCase({
        claimant: account.name,
        claim_link: actionData.claim_link,
        lang_codes: actionData.lang_codes,
        respondant: actionData.respondant,
      });

      break;

    }
    case 'shredcase': {

      yield arbitrationContract.shredCase({
        case_id: casefile.case_id,
        claimant: account.name,
      });
      break;

    }
    case 'readycase': {

      yield arbitrationContract.readyCase({
        case_id: casefile.case_id,
        claimant: account.name,
      });
      break;

    }
    case 'addclaim': {

      yield arbitrationContract.addClaim({
        case_id: casefile.case_id,
        claimant: account.name,
        claim_link: actionData.claim_link,
      });
      break;
    }
    case 'removeclaim': {

      yield arbitrationContract.removeClaim({
        claimant: account.name,
        case_id: casefile.case_id,
        claim_hash: claim.claim_summary,
      });
      break;

    }
    case 'respondclaim': {

      yield arbitrationContract.respondClaim({
        case_id: casefile.case_id,
        claim_hash: claim.claim_summary,
        respondant: account.name,
        response_link: actionData.response_link,
      });
      break;

    }
    case 'acceptclaim': {

      yield arbitrationContract.acceptClaim({
        case_id: casefile.case_id,
        assigned_arb: account.name,
        claim_hash: claim.claim_summary,
        decision_link: actionData.decision_link,
        decision_class: actionData.decision_class,
      });
      break;

    }
    case 'dismissclaim': {

      yield arbitrationContract.dismissClaim({
        case_id: casefile.case_id,
        assigned_arb: account.name,
        claim_hash: claim.claim_summary,
        memo: actionData.memo,
      });
      break;

    }
    case 'addarbs': {

      yield arbitrationContract.addArbs({
        case_id: casefile.case_id,
        assigned_arb: account.name,
        num_arbs_to_assign: actionData.num_arbs_to_assign,
      });
      break;

    }
    case 'setruling': {

      yield arbitrationContract.setRuling({
        case_id: casefile.case_id,
        assigned_arb: account.name,
        case_ruling: actionData.case_ruling,
      });
      break;

    }
    case 'recuse': {

      yield arbitrationContract.recuse({
        case_id: casefile.case_id,
        rationale: actionData.rationale,
        assigned_arb: account.name,
      });
      break;

    }
    case 'submitcasefile': {

      const balance = yield arbitrationContract.getAccountBalance(account.name);

      if(parseFloat(balance.value) < 100) {
        yield arbitrationContract.deposit(account.name);
      }

      yield arbitrationContract.readyCase({
        case_id: casefile.case_id,
        claimant: account.name,
      });
      break;

    }
    case 'arbitratorsettings': {

      yield arbitrationContract.newArbStatus({
        arbitrator: account.name,
        new_status: actionData.new_status,
      });
      yield arbitrationContract.setLangCodes({
        arbitrator: account.name,
        lang_codes: actionData.lang_codes,
      });
      yield put(ArbitratorsActions.fetchArbitrators());
      break;

    }
    default: {
      throw new Error(`Unknown action ${actionName}`);
    }
  }

  yield finishAction();
  yield put(CasesActions.fetchCases());

}

export default function* casesSaga() {

  yield takeEvery(ActionTypes.EXECUTE_ACTION, executeAction);

}
