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
  arbitratorCases: [],
  selectedCaseId: null,
  memberAction: null, // TODO Move somewhere else
  memberActionLoading: false, // TODO Move somewhere else
};


function parseCases(cases) {

  const affectedCases = cases.map(c => Object.assign({}, emptyCase, c));

  affectedCases.forEach(casefile => {

    // TODO restore this when demux fixed
    casefile.unread_claims.forEach(c => c.claim_status = 'unread');
    casefile.accepted_claims.forEach(c => c.claim_status = 'accepted');
    casefile.dismiss_claims = [];
    //casefile.dismiss_claims.forEach(c => c.claim_status = 'dismissed');
    casefile.claims = [].concat(casefile.unread_claims).concat(casefile.accepted_claims).concat(casefile.dismiss_claims);

  });

  return affectedCases;

}

function setClaimantCases(state, action) {

  return {
    ...state,
    claimantCases: parseCases(action.cases),
  };

}
function setRespondantCases(state, action) {

  return {
    ...state,
    respondantCases: parseCases(action.cases),
  };

}
function setArbitratorCases(state, action) {

  return {
    ...state,
    arbitratorCases: parseCases(action.cases),
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
function setMemberActionLoading(state, { loading }) {
  return {
    ...state,
    memberActionLoading: loading,
  };
}

export const reducer = createReducer(initialState, {
  [ActionTypes.SET_CLAIMANT_CASES]: setClaimantCases,
  [ActionTypes.SET_RESPONDANT_CASES]: setRespondantCases,
  [ActionTypes.SET_ARBITRATOR_CASES]: setArbitratorCases,
  [ActionTypes.SET_SELECTED_CASE]: setSelectedCase,
  [ActionTypes.SET_MEMBER_ACTION]: setMemberAction,
  [ActionTypes.SET_MEMBER_ACTION_LOADING]: setMemberActionLoading,
});
