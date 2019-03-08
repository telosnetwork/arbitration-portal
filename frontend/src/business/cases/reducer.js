import { ActionTypes } from 'const';
import { createReducer } from 'utils/redux';

export const STATE_KEY = 'cases';

const emptyCase = {
    case_id:           0,
    case_status:       0,
    claimant:          '',
    respondant:        '',
    arbitrators:       [],
    approvals:         [],
    required_langs:    null,
    unread_claims:     [],
    accepted_claims:   [],
    case_ruling:       ''
};

const initialState = {
    caseList: [],
};

function setCases(state, action) {

    const caseList = action.cases.map(c => Object.assign({}, emptyCase, c));
    return Object.assign({
        caseList,
    });

}

export const reducer = createReducer(initialState, {
    [ActionTypes.SET_CASES]: setCases,
});