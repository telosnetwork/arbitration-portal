import { put, takeEvery, select } from 'redux-saga/effects';
import { ActionTypes }    from 'const';

import * as api     from 'utils/api-client';
import * as actions from './actions';
import { AuthenticationSelectors } from '../selectors';

export function* fileCase({ caseData }) {

  const account = yield select(AuthenticationSelectors.account);
  console.log(caseData, account);

  const claimant = account.name;
  const { claim_link, lang_codes, respondant } = caseData;

  const actionData = {
    claimant,
    claim_link,
    lang_codes,
    respondant,
  };

  const eosio = yield select(AuthenticationSelectors.eosio);

  let actions = yield eosio.makeAction(
    process.env.REACT_APP_EOSIO_CONTRACT_ACCOUNT,
    'filecase',
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

// TODO Factorize
export function* addClaim({ claimData }) {

  const account = yield select(AuthenticationSelectors.account);
  console.log(claimData, account);

  const claimant = account.name;
  const { case_id, claim_link } = claimData;

  const actionData = {
    case_id,
    claimant,
    claim_link,
  };

  const eosio = yield select(AuthenticationSelectors.eosio);

  let actions = yield eosio.makeAction(
    process.env.REACT_APP_EOSIO_CONTRACT_ACCOUNT,
    'addclaim',
    actionData,
  );
  console.log(actions);

  let result = yield eosio.sendTx(actions);
  console.log('Results: ', result);
  if (result) {
    alert(`Addclaim Successful`);
  } else {
    alert(`Addclaim Unsuccessful`);
  }

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
