import { /*all,*/ call, take, put, takeEvery, select } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { ActionTypes }    from 'const';

//import * as api     from 'utils/api-client';
import IoClient from 'utils/io-client';
import * as actions from './actions';
import { AuthenticationSelectors } from '../selectors';

export function* fetchCasesFromTable() {

  const account = yield select(AuthenticationSelectors.account);
  if(!account) throw new Error('Must be logged in first to fetch cases');
  const arbitrationContract = yield select(AuthenticationSelectors.arbitrationContract);
  const memberName = account.name;

  const cases = yield arbitrationContract.getCases();
  const acceptedClaims = yield arbitrationContract.getClaims();
  cases.forEach(casefile => {
    casefile.accepted_claims = casefile.accepted_claims.map(claimId => acceptedClaims.find(claim => claim.claim_id === claimId));
  });

  const claimantCases = cases.filter(c => c.claimant === memberName);
  const respondantCases = cases.filter(c => c.respondant === memberName);
  const arbitratorCases = cases.filter(c => c.arbitrators.includes(memberName));

  yield put(actions.setClaimantCases(claimantCases));
  yield put(actions.setRespondantCases(respondantCases));
  yield put(actions.setArbitratorCases(arbitratorCases));

}

export function* fetchCases() {

  yield fetchCasesFromTable();

  console.log('fetched cases');
  /*
  const [ claimantCases, respondantCases ]  = yield all([
    call(api.getCases, { claimant: memberName }),
    call(api.getCases, { respondant: memberName }),
  ]);

  yield put(actions.setRespondantCases(respondantCases));
  yield put(actions.setClaimantCases(claimantCases));
  */

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

const wait = duration => new Promise(res => setTimeout(res, duration));

export function* autoRefresh() {

  while (true) {
    yield wait(10000);
    yield put(actions.fetchCases());
  }

}

export default function* casesSaga() {

  yield takeEvery(ActionTypes.FETCH_CASES, fetchCases);

  yield takeEvery(ActionTypes.LISTEN_WEBSOCKET, listenWebsocket);
  yield takeEvery(ActionTypes.LISTEN_WEBSOCKET, autoRefresh);

  yield takeEvery(ActionTypes.HANDLE_WEBSOCKET, handleWebsocket);

}
