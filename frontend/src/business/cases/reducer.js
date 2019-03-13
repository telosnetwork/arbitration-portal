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
  claimantCases: [],
  respondantCases: [],
  selectedCaseId: null,
  memberAction: null, // TODO Move somewhere else
};

function setClaimantCases(state, action) {

  const claimantCases = action.cases.map(c => Object.assign({}, emptyCase, c));

  claimantCases.forEach(casefile => {
    casefile.unread_claims.forEach(c => c.claim_status = 'unread');
    casefile.accepted_claims.forEach(c => c.claim_status = 'accepted');
    casefile.dismiss_claims.forEach(c => c.claim_status = 'dismissed');
    casefile.claims = [].concat(casefile.unread_claims).concat(casefile.accepted_claims).concat(casefile.dismiss_claims);
  });

  return {
    ...state,
    claimantCases,
  };

}
function setRespondantCases(state, action) {

  const respondantCases = action.cases.map(c => Object.assign({}, emptyCase, c));

  respondantCases.forEach(casefile => {
    casefile.unread_claims.forEach(c => c.claim_status = 'unread');
    casefile.accepted_claims.forEach(c => c.claim_status = 'accepted');
    casefile.dismiss_claims.forEach(c => c.claim_status = 'dismissed');
    casefile.claims = [].concat(casefile.unread_claims).concat(casefile.accepted_claims).concat(casefile.dismiss_claims);
  });

  return {
    ...state,
    respondantCases,
  };

}

function setSelectedCase(state, action) {

  return {
    ...state,
    selectedCaseId: action.case_id !== undefined ? action.case_id : null,
  };

}

function setMemberAction(state, { actionName }) {

  return {
    ...state,
    memberAction: actionName,
  };

}

export const reducer = createReducer(initialState, {
  [ActionTypes.SET_CLAIMANT_CASES]: setClaimantCases,
  [ActionTypes.SET_RESPONDANT_CASES]: setRespondantCases,
  [ActionTypes.SET_SELECTED_CASE]: setSelectedCase,
  [ActionTypes.SET_MEMBER_ACTION]: setMemberAction,
});
