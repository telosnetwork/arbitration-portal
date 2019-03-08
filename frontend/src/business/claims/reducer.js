import { ActionTypes } from 'const';
import { createReducer } from 'utils/redux';

export const STATE_KEY = 'claims';

const initialState = {
  selectedClaimId: null,
};

function setSelectedClaim(state, action) {

  return {
    ...state,
    selectedClaimId: action.claim_id !== undefined ? action.claim_id : null,
  };

}

export const reducer = createReducer(initialState, {
  [ActionTypes.SET_SELECTED_CLAIM]: setSelectedClaim,
});
