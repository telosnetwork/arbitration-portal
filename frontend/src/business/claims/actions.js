import { ActionTypes } from 'const';

export function setSelectedClaim(claim_summary) {
  return {
    type: ActionTypes.SET_SELECTED_CLAIM,
    claim_summary,
  };
}

export function fetchClaims() {
  return {
    type: ActionTypes.FETCH_CLAIMS,
  };
}

export function setClaims(claims) {
  return {
    type: ActionTypes.SET_CLAIMS,
    claims,
  };
}
