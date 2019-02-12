import { ActionTypes } from 'const';

const initialState = {
    case_id:           0,
    case_status:       0,
    claimant:          '',
    respondant:        '',
    arbitrators:       [0],
    required_langs:    null,
    unread_claims:  {
        claim_id:      0,
        claim_summary: '',
        decision_link: ''
    },
    accepted_claims:   [0],
    case_ruling:       '',
    arb_comment:       ''
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SET_CASES: {
            return Object.assign({}, state, {
                case_id: typeof action.case_id === "undefined" ? state.case_id : action.case_id,
                case_status: action.case_status         || initialState.case_status,
                claimant: action.claimant               || initialState.claimant,
                respondant: action.respondant           || initialState.respondant,
                arbitrators: action.arbitrators         || initialState.arbitrators,
                required_langs: action.required_langs   || initialState.required_langs,
                unread_claims: action.unread_claims     || initialState.unread_claims,
                accepted_claims: action.accepted_claims || initialState.accepted_claims,
                case_ruling: action.case_ruling         || initialState.case_ruling,
                arb_comment: action.arb_comment         || initialState.arb_comment
            });
        }
        default:
            return state;
    }
}