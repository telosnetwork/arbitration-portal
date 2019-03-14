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
export function shredCase(case_id) {
  return {
    type: ActionTypes.SHRED_CASE,
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
export function removeClaim(casefile, claim) {
  return {
    type: ActionTypes.REMOVE_CLAIM,
    casefile,
    claim,
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

