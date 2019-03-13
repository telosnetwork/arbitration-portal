import { call, take, put, takeEvery, select } from 'redux-saga/effects';
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

export function* sendAction({ action, actionData }) {

  yield put(actions.setMemberActionLoading(true));

  const eosio = yield select(AuthenticationSelectors.eosio);

  let actionObject = yield eosio.makeAction(
    process.env.REACT_APP_EOSIO_CONTRACT_ACCOUNT,
    action,
    actionData,
  );
  console.log(actionObject);

  let result = yield eosio.sendTx(actionObject);
  console.log('Results: ', result);
  if (result) {
    alert(`FileCase Successful`);
  } else {
    alert(`FileCase Unsuccessful`);
  }

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

  yield sendAction({ action: 'filecase', actionData })

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

  yield sendAction({ action: 'addclaim', actionData })

}

export function* deleteCase({ case_id }) {

  const actionData = {
    case_id,
  };

  yield sendAction({ action: 'deletecase', actionData })

}

export function* deleteClaim({ case_id, claim_id }) {

  const actionData = {
    case_id,
    claim_id,
  };

  yield sendAction({ action: 'deleteclaim', actionData })

}

export function* readyCase({ case_id }) {

  const account = yield select(AuthenticationSelectors.account);
  const claimant = account.name;

  const actionData = {
    case_id,
    claimant,
  };

  yield sendAction({ action: 'readycase', actionData })

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

  yield sendAction({ action: 'respond', actionData })

}

export function* fetchCases() {

  const account = yield select(AuthenticationSelectors.account);
  if(!account) throw new Error('Must be logged in first')
  const memberName = account.name;

  // TODO parallel

  let claimantCases = yield api.getCases({
    claimant: memberName,
  });
  yield put(actions.setClaimantCases(claimantCases));

  let respondantCases = yield api.getCases({
    respondant: memberName,
  });
  yield put(actions.setRespondantCases(respondantCases));

}

// When any of this websocket message will be received, all the cases will be updated
// TODO make a custom behaviour for certain.
// For now it works because it just refetches everything and we get a clean state
// Typically we should filter actions that corresponds to us (events are sent to everyone, so if someone else update, we update all but our cases didnt change)
const updatingActions = [
  'fileCaseAction',
  'shredCaseAction',
  'deleteCaseAction',
  'advanceCaseAction',
  'readyCaseAction',
  'addClaimAction',
  'acceptClaimAction',
  'removeClaimAction',
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
  yield takeEvery(ActionTypes.DELETE_CLAIM, deleteClaim);
  yield takeEvery(ActionTypes.READY_CASE, readyCase);
  yield takeEvery(ActionTypes.RESPOND_CLAIM, respondClaim);
  yield takeEvery(ActionTypes.LISTEN_WEBSOCKET, listenWebsocket);
  yield takeEvery(ActionTypes.HANDLE_WEBSOCKET, handleWebsocket);

}
