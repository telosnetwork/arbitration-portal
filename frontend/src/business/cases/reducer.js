import { ActionTypes }   from 'const';
import { createReducer } from 'utils/redux';

export const STATE_KEY = 'cases';

const emptyCase = {
  case_id:           0,
  case_status:       0,
  claimant:          '',
  respondant:        '',
  arbitrators:       [],
  approvals:         [],
  required_langs:    null,
  unread_claims:     [],
  accepted_claims:   [],
  dismiss_claims:   [],
  case_ruling:       ''
};

const initialState = {
  caseList: [],
  selectedCaseId: null
};

function setCases(state, action) {

  const caseList = action.cases.map(c => Object.assign({}, emptyCase, c));

  caseList.forEach(casefile => {
    casefile.unread_claims.forEach(c => c.claim_status = 'unread');
    casefile.accepted_claims.forEach(c => c.claim_status = 'accepted');
    casefile.dismiss_claims.forEach(c => c.claim_status = 'dismissed');
    casefile.claims = [].concat(casefile.unread_claims).concat(casefile.accepted_claims).concat(casefile.dismiss_claims);
  });

  return {
    ...state,
    caseList,
  };

}

function setSelectedCase(state, action) {

  return {
    ...state,
    selectedCaseId: action.case_id !== undefined ? action.case_id : null,
  };

}

export const reducer = createReducer(initialState, {
  [ActionTypes.SET_CASES]: setCases,
  [ActionTypes.SET_SELECTED_CASE]: setSelectedCase,
});
