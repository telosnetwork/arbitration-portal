import { ActionTypes }   from 'const';
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
// const emptyClaim = {
//     claim_id:       0,
//     claim_summary:  '',
//     decision_link:  '',
//     response_link:  '',
//     decision_class: null
// };

// const initialState = {
//     claimList: [],
// };

// function setClaims(state, action) {

//     const claimList = action.claims.map(c => Object.assign({}, emptyClaim, c));
//     return {
//       ...state,
//         claimList,
//     };
}

export const reducer = createReducer(initialState, {
  [ActionTypes.SET_SELECTED_CLAIM]: setSelectedClaim,
//   [ActionTypes.SET_CLAIMS]: setClaims,
});
