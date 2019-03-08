import { ActionTypes } from 'const';

export function setSelectedClaim(claim_id) {
  return {
    type: ActionTypes.SET_SELECTED_CLAIM,
    claim_id,
  }
}
