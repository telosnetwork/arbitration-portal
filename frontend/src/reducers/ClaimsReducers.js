import { ActionTypes } from 'const';

const initialState = {
    claim_id:       0,
    claim_summary:  '',
    decision_link:  '',
    decision_class: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SET_CLAIMS: {
            return Object.assign({}, state, {
                claim_id: typeof action.claim_id === "undefined" ? state.claim_id : action.claim_id,
                claim_summary: action.claim_summary   || initialState.claim_summary,
                decision_link: action.decision_link   || initialState.decision_link,
                response_link: action.response_link   || initialState.response_link,
                decision_class: action.decision_class || initialState.decision_class
            });
        }
        default:
            return state;
    }
}