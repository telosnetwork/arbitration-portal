import { ActionTypes }   from 'const';
import { createReducer } from 'utils/redux';

export const STATE_KEY = 'modal';

const initialState = {
  action: null,
  actionError: null,
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
function setActionError(state, { error }) {
  return {
    ...state,
    actionError: error,
  };
}

export const reducer = createReducer(initialState, {
  [ActionTypes.SET_ACTION]: setAction,
  [ActionTypes.SET_ACTION_LOADING]: setActionLoading,
  [ActionTypes.SET_ACTION_ERROR]: setActionError,
});
