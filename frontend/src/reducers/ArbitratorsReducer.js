import { ActionTypes } from 'const';

const initialState = {
    arb:              '',
    arb_status:       0,
    open_case_ids:    [0],
    closed_case_ids:  [0],
    credentials_link: '',
    elected_time:     0,
    term_expiration:  0,
    languages:        null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SET_ARBITRATORS: {
            return Object.assign({}, state, {
                arb: typeof action.arb === "undefined" ? state.arb : action.arb,
                arb_status: action.arb_status             || initialState.arb_status,
                open_case_ids: action.open_case_ids       || initialState.open_case_ids,
                closed_case_ids: action.closed_case_ids   || initialState.closed_case_ids,
                credentials_link: action.credentials_link || initialState.credentials_link,
                elected_time: action.elected_time         || initialState.elected_time,
                term_expiration: action.term_expiration   || initialState.term_expiration,
                languages: action.languages               || initialState.languages
            }); 
        }
        default:
            return state;
    }
}