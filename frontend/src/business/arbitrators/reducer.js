import { ActionTypes }   from 'const';
import { createReducer } from 'utils/redux';

export const STATE_KEY = 'arbitrators';

const emptyArbitrator = {
    arb:              '',
    arb_status:       0,
    open_case_ids:    [0],
    closed_case_ids:  [0],
    credentials_link: '',
    elected_time:     0,
    term_expiration:  0,
    languages:        null
};

const initialState = {
    arbitratorList: [],
};

function setArbitrators(state, action) {

    const arbitratorList = action.cases.map(c => Object.assign({}, emptyArbitrator, c));
    return Object.assign({
        arbitratorList,
    });

}

export const reducer = createReducer(initialState, {
    [ActionTypes.SET_ARBITRATORS]: setArbitrators,
});