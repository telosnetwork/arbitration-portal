import { all, call, take, put, takeEvery, select } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { ActionTypes }    from 'const';

import * as api     from 'utils/api-client';
import IoClient from 'utils/io-client';
import * as actions from './actions';
import { AuthenticationSelectors } from '../selectors';
import { ClaimsActions } from '../actions';

// TODO All this things should be done in a contract wrapper outside of the saga, and the saga should call them

export function* finishAction() {

  yield put(actions.setMemberAction(null));
  yield put(actions.setMemberActionLoading(false));
  yield put(actions.setSelectedCase(null));
  yield put(ClaimsActions.setSelectedClaim(null));

}

export function* executeAction({ action, actionData }) {

  yield put(actions.setMemberActionLoading(true));

  const eosio = yield select(AuthenticationSelectors.eosio);

  yield eosio.createAndSendAction(
    process.env.REACT_APP_EOSIO_CONTRACT_ACCOUNT,
    action,
    actionData
  );

  yield finishAction();

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

  yield executeAction({ action: 'filecase', actionData })

}

export function* addClaim({ claimData }) {

  const account = yield select(AuthenticationSelectors.account);
  const claimant = account.name;

  const { case_id, claim_link } = claimData;

  const actionData = {
    case_id,
    claimant,
    claim_link,
  };

  yield executeAction({ action: 'addclaim', actionData })

}

export function* deleteCase({ case_id }) {

  const actionData = {
    case_id,
  };

  yield executeAction({ action: 'deletecase', actionData })

}

export function* shredCase({ case_id }) {

  const account = yield select(AuthenticationSelectors.account);
  const claimant = account.name;

  const actionData = {
    case_id,
    claimant,
  };

  yield executeAction({ action: 'shredcase', actionData })

}

export function* deleteClaim({ case_id, claim_id }) {

  const actionData = {
    case_id,
    claim_id,
  };

  yield executeAction({ action: 'deleteclaim', actionData })

}

export function* removeClaim({ casefile, claim }) {

  const account = yield select(AuthenticationSelectors.account);
  const claimant = account.name;

  const actionData = {
    claimant,
    case_id: casefile.case_id,
    claim_hash: claim.claim_summary,
  };

  yield executeAction({ action: 'removeclaim', actionData })

}

export function* readyCase({ case_id }) {

  const account = yield select(AuthenticationSelectors.account);
  const claimant = account.name;

  const actionData = {
    case_id,
    claimant,
  };

  yield executeAction({ action: 'readycase', actionData })

}

export function* getAccountBalance() {

  const eosio = yield select(AuthenticationSelectors.eosio);
  const account = yield select(AuthenticationSelectors.account);

  // TODO use demux ?
  const balanceRows = yield eosio.getTable('eosio.arb', 'accounts', account.name, 1);
  const balanceString = balanceRows[0] ? balanceRows[0].balance : '0.0000 TLOS';
  const balance = eosio.constructor.parseBalance(balanceString);

  return balance;

}
export function* deposit() {

  const eosio = yield select(AuthenticationSelectors.eosio);
  const account = yield select(AuthenticationSelectors.account);

  const actionData =  {
    from: account.name,
    to: 'eosio.arb',
    quantity: '100.0000 TLOS',
    memo: 'Deposit for arbitration',
  };

  yield eosio.createAndSendAction(
    'eosio.token',
    'transfer',
    actionData
  );

}

export function* submitCasefile({ case_id }) {

  yield put(actions.setMemberActionLoading(true));

  const balance = yield getAccountBalance();
  if(parseFloat(balance) < 100) {
    yield deposit();
  }

  yield readyCase({ case_id });

  yield finishAction();

}

export function* respondClaim({ responseData }) {

  const account = yield select(AuthenticationSelectors.account);
  const respondant = account.name;

  const claim_hash = ''; // TODO ???

  const { case_id, response_link } = responseData;

  const actionData = {
    case_id,
    claim_hash,
    respondant,
    response_link,
  };

  yield executeAction({ action: 'respond', actionData })

}

export function* fetchCases() {

  const account = yield select(AuthenticationSelectors.account);
  if(!account) throw new Error('Must be logged in first')
  const memberName = account.name;

  const [ claimantCases, respondantCases ]  = yield all([
    call(api.getCases, { claimant: memberName }),
    call(api.getCases, { respondant: memberName }),
  ]);

  yield put(actions.setRespondantCases(respondantCases));
  yield put(actions.setClaimantCases(claimantCases));

}

// When any of this websocket message will be received, all the cases will be updated
// TODO make a custom behaviour for certain.
// For now it works because it just refetches everything and we get a clean state
// Typically we should filter actions that corresponds to us (events are sent to everyone, so if someone else update, we update all but our cases didnt change)
const updatingActions = [
  'fileCaseAction',
  'shredCaseAction',
  'deleteCaseAction',
  'dismissCaseAction',
  'advanceCaseAction',
  'readyCaseAction',

  'addClaimAction',
  'acceptClaimAction',
  'removeClaimAction',
  'dismissClaimAction',

  'addArbsAction',
  'assignToCaseAction',
  'newArbStatusAction',
  'recuseAction',
  'respondAction',
  'setLangCodesAction',
  'setRulingAction',
];

function initWebsocket() {
  return eventChannel(emitter => {

    const client = new IoClient();

    function listenAction(actionName) {

      client.onMessage(actionName, data => {
        console.log('received message', actionName, data);
        const payload = {
          actionName,
          data,
        };
        emitter({ type: 'HANDLE_WEBSOCKET', payload })
      });

    }

    updatingActions.forEach(listenAction)

    return () => {
      client.off();
    };

  })
}

export function* handleWebsocket({ payload }) {

  const { actionName } = payload;

  if(updatingActions.indexOf(actionName) !== -1) {
    yield put(actions.fetchCases());
  }

}

export function* listenWebsocket() {

  const channel = yield call(initWebsocket);
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }

}

export default function* casesSaga() {

  yield takeEvery(ActionTypes.FETCH_CASES, fetchCases);
  yield takeEvery(ActionTypes.FILE_CASE, fileCase);
  yield takeEvery(ActionTypes.ADD_CLAIM, addClaim);
  yield takeEvery(ActionTypes.DELETE_CASE, deleteCase);
  yield takeEvery(ActionTypes.SHRED_CASE, shredCase);
  yield takeEvery(ActionTypes.DELETE_CLAIM, deleteClaim);
  yield takeEvery(ActionTypes.REMOVE_CLAIM, removeClaim);
  yield takeEvery(ActionTypes.READY_CASE, readyCase);
  yield takeEvery(ActionTypes.RESPOND_CLAIM, respondClaim);
  yield takeEvery(ActionTypes.LISTEN_WEBSOCKET, listenWebsocket);
  yield takeEvery(ActionTypes.HANDLE_WEBSOCKET, handleWebsocket);
  yield takeEvery(ActionTypes.SUBMIT_CASEFILE, submitCasefile);

}
