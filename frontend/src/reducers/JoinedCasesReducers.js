import { ActionTypes } from 'const';

const initialState = {
    join_id:   0,
    cases:    [0],
    join_time: 0,
    joined_by: ''
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ActionTypes.SET_JOINEDCASES: {
            return Object.assign({}, state, {
                join_id: typeof action.join_id === "undefined" ? state.join_id : action.join_id,
                cases: action.cases         || initialState.cases,
                join_time: action.join_time || initialState.join_time,
                joined_by: action.joined_by || initialState.joined_by
            });
        }
        default: 
            return state;
    }
}