import { all, call, take, put, takeEvery, select } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { ActionTypes }    from 'const';

import * as api     from 'utils/api-client';
import IoClient from 'utils/io-client';
import * as actions from './actions';
import { AuthenticationSelectors, CasesSelectors, ClaimsSelectors } from '../selectors';
import { ClaimsActions } from '../actions';

// TODO All this things should be done in a contract wrapper outside of the saga, and the saga should call them

export function* finishAction() {

  yield put(actions.setMemberAction(null));
  yield put(actions.setMemberActionLoading(false));
  yield put(actions.setSelectedCase(null));
  yield put(ClaimsActions.setSelectedClaim(null));

}

export function* executeAction({ actionName, actionData }) {

  yield put(actions.setMemberActionLoading(true));

  const account = yield select(AuthenticationSelectors.account);
  if(!account) throw new Error('Must be logged in first to execute action');

  const arbitrationContract = yield select(AuthenticationSelectors.arbitrationContract);
  const casefile = yield select(CasesSelectors.getSelectedCase);
  const claim = yield select(ClaimsSelectors.getSelectedClaim);

  switch(actionName) {
    case 'filecase': {

      const casefileData = {
        claimant: account.name,
        claim_link: actionData.claim_link,
        lang_codes: actionData.lang_codes,
        respondant: actionData.respondant,
      };
      yield arbitrationContract.fileCase(casefileData);

      break;
    }
    case 'shredcase': {

      const data = {
        case_id: casefile.case_id,
        claimant: account.name,
      };

      yield arbitrationContract.shredCase(data);
      break;
    }
    case 'readycase': {

      const data = {
        case_id: casefile.case_id,
        claimant: account.name,
      };
      yield arbitrationContract.readyCase(data);
      break;

    }
    case 'addclaim': {

      const addClaimData = {
        case_id: casefile.case_id,
        claimant: account.name,
        claim_link: actionData.claim_link,
      };
      yield arbitrationContract.addClaim(addClaimData);
      break;
    }
    case 'removeclaim': {

      const data = {
        claimant: account.name,
        case_id: casefile.case_id,
        claim_hash: claim.claim_summary,
      };
      yield arbitrationContract.removeClaim(data);
      break;

    }
    case 'respondclaim': {

      const data = {
        case_id: casefile.case_id,
        claim_hash: claim.claim_summary,
        respondant: account.name,
        response_link: actionData.response_link,
      };
      yield arbitrationContract.respondClaim(data);
      break;

    }
    case 'submitcasefile': {

      const account = yield select(AuthenticationSelectors.account);
      if(!account) throw new Error('Must be logged in first to execute action');

      const arbitrationContract = yield select(AuthenticationSelectors.arbitrationContract);
      const balance = yield arbitrationContract.getAccountBalance(account.name);

      if(parseFloat(balance.value) < 100) {
        yield arbitrationContract.deposit(account.name);
      }

      const data = {
        case_id: casefile.case_id,
        claimant: account.name,
      };
      yield arbitrationContract.readyCase(data);
      break;

    }
    default: {
      throw new Error(`Unknown action ${actionName}`);
    }
  }

  yield finishAction();

}

export function* fetchCases() {

  const account = yield select(AuthenticationSelectors.account);
  if(!account) throw new Error('Must be logged in first to fetch cases');
  const memberName = account.name;

  const [ claimantCases, respondantCases ]  = yield all([
    call(api.getCases, { claimant: memberName }),
    call(api.getCases, { respondant: memberName }),
  ]);

  yield put(actions.setRespondantCases(respondantCases));
  yield put(actions.setClaimantCases(claimantCases));

  // TODO remove when demux indexes are ok
  const arbitrationContract = yield select(AuthenticationSelectors.arbitrationContract);
  const data = yield  arbitrationContract.getAccountCases(account.name);
  console.log(data );

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

  yield takeEvery(ActionTypes.LISTEN_WEBSOCKET, listenWebsocket);
  yield takeEvery(ActionTypes.HANDLE_WEBSOCKET, handleWebsocket);

  yield takeEvery(ActionTypes.EXECUTE_ACTION, executeAction);

}
