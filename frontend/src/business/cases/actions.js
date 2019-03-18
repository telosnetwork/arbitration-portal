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
export function setArbitratorCases(cases) {
    return {
        type: ActionTypes.SET_ARBITRATOR_CASES,
        cases,
    }
}

export function setSelectedCase(case_id) {
  return {
    type: ActionTypes.SET_SELECTED_CASE,
    case_id,
  }
}
