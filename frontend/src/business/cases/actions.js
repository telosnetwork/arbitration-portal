import { ActionTypes } from 'const';

export function fetchCases() {
    return {
        type: ActionTypes.FETCH_CASES,
    };
}

export function setClaimantCases(cases) {
    return {
        type: ActionTypes.SET_CLAIMANT_CASES,
        cases,
    }
}


export function setRespondantCases(cases) {
    return {
        type: ActionTypes.SET_RESPONDANT_CASES,
        cases,
    }
}

export function setSelectedCase(case_id) {
  return {
    type: ActionTypes.SET_SELECTED_CASE,
    case_id,
  }
}

export function setMemberAction(actionName) {
  return {
    type: ActionTypes.SET_MEMBER_ACTION,
    actionName,
  }
}

export function setMemberActionLoading(loading) {
  return {
    type: ActionTypes.SET_MEMBER_ACTION_LOADING,
    loading: !!loading,
  }
}

export function submitCasefile(case_id) {
  return {
    type: ActionTypes.SUBMIT_CASEFILE,
    case_id,
  }
}

export function executeAction(actionName, actionData) {
  return {
    type: ActionTypes.EXECUTE_ACTION,
    actionName,
    actionData,
  }
}
