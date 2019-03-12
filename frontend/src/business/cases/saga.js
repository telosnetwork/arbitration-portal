import { put, takeEvery, select } from 'redux-saga/effects';
import { ActionTypes }    from 'const';

import * as api     from 'utils/api-client';
import * as actions from './actions';
import { AuthenticationSelectors } from '../selectors';

export function* sendAction({ action, actionData }) {

  const eosio = yield select(AuthenticationSelectors.eosio);

  let actions = yield eosio.makeAction(
    process.env.REACT_APP_EOSIO_CONTRACT_ACCOUNT,
    action,
    actionData,
  );
  console.log(actions);

  let result = yield eosio.sendTx(actions);
  console.log('Results: ', result);
  if (result) {
    alert(`FileCase Successful`);
  } else {
    alert(`FileCase Unsuccessful`);
  }

}

export function* fileCase({ caseData }) {

  const account = yield select(AuthenticationSelectors.account);

  const claimant = account.name;
  const { claim_link, lang_codes, respondant } = caseData;

  const actionData = {
    claimant,
    claim_link,
    lang_codes,
    respondant,
  };

  yield sendAction({ action: 'filecase', actionData })

}

// TODO Factorize
export function* addClaim({ claimData }) {

  const account = yield select(AuthenticationSelectors.account);

  const claimant = account.name;
  const { case_id, claim_link } = claimData;

  const actionData = {
    case_id,
    claimant,
    claim_link,
  };

  yield sendAction({ action: 'addclaim', actionData })

}

export function* fetchCases() {

  let cases = yield api.getCases();
  yield put(actions.setCases(cases));

}

export default function* casesSaga() {

  yield takeEvery(ActionTypes.FETCH_CASES, fetchCases);
  yield takeEvery(ActionTypes.FILE_CASE, fileCase);
  yield takeEvery(ActionTypes.ADD_CLAIM, addClaim);

}
