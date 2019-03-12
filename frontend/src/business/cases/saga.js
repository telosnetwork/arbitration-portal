import { put, takeEvery, select } from 'redux-saga/effects';
import { ActionTypes }    from 'const';

import * as api     from 'utils/api-client';
import * as actions from './actions';
import { AuthenticationSelectors } from '../selectors';

export function* fileCase({ caseData }) {

  const account = yield select(AuthenticationSelectors.account);
  console.log(caseData, account);

  const claimant = account.account_name;
  const { claim_link, lang_codes, respondant } = caseData;

  const actionData = {
    claimant:   claimant,
    claim_link: claim_link,
    lang_codes: lang_codes,
    respondant: respondant,
  };
  console.log(actionData);

  /*
  let actions = yield this.eosio.makeAction(
    process.env.REACT_APP_EOSIO_CONTRACT_ACCOUNT,
    'filecase',
    actionData,
  );
  console.log(actions);
  let result = yield this.eosio.sendTx(actions);
  console.log('Results: ', result);
  if (result) {
    alert(`FileCase Successful`);
  } else {
    alert(`FileCase Unsuccessful`);
  }
*/
}
export function* fetchCases() {

  let cases = yield api.getCases();
  yield put(actions.setCases(cases));

}

export default function* casesSaga() {

  yield takeEvery(ActionTypes.FETCH_CASES, fetchCases);
  yield takeEvery(ActionTypes.FILE_CASE, fileCase);

}
