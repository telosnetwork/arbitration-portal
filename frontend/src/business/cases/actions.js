import { ActionTypes } from 'const';

export function fetchCases() {
    return {
        type: ActionTypes.FETCH_CASES,
    };
}

export function setCases(cases) {
    return {
        type: ActionTypes.SET_CASES,
        cases,
    }
}

export function setSelectedCase(case_id) {
  return {
    type: ActionTypes.SET_SELECTED_CASE,
    case_id,
  }
}

export function fileCase(caseData) {
  return {
    type: ActionTypes.FILE_CASE,
    caseData,
  }
}
export function addClaim(claimData) {
  return {
    type: ActionTypes.ADD_CLAIM,
    claimData,
  }
}
export function deleteCase(case_id) {
  return {
    type: ActionTypes.DELETE_CASE,
    case_id,
  }
}
export function deleteClaim(case_id, claim_id) {
  return {
    type: ActionTypes.DELETE_CLAIM,
    case_id,
    claim_id,
  }
}
export function readyCase(case_id) {
  return {
    type: ActionTypes.READY_CASE,
    case_id,
  }
}
export function respondClaim(responseData) {
  return {
    type: ActionTypes.RESPOND_CLAIM,
    responseData,
  }
}
