import { ActionTypes }   from 'const';
import { createReducer } from 'utils/redux';

export const STATE_KEY = 'modal';

const initialState = {
  action: null,
  actionLoading: false,
};

function setAction(state, { actionName }) {
  return {
    ...state,
    action: actionName,
  };
}
function setActionLoading(state, { loading }) {
  return {
    ...state,
    actionLoading: loading,
  };
}

export const reducer = createReducer(initialState, {
  [ActionTypes.SET_ACTION]: setAction,
  [ActionTypes.SET_ACTION_LOADING]: setActionLoading,
});
