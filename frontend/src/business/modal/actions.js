import { ActionTypes } from 'const';

export function setAction(actionName) {
  return {
    type: ActionTypes.SET_ACTION,
    actionName,
  }
}

export function setActionLoading(loading) {
  return {
    type: ActionTypes.SET_ACTION_LOADING,
    loading: !!loading,
  }
}

export function setActionError(error) {
  return {
    type: ActionTypes.SET_ACTION_ERROR,
    error: error,
  }
}

export function submitCasefile(case_id) {
  return {
    type: ActionTypes.SUBMIT_CASEFILE,
    case_id,
  }
}

export function executeAction(actionName, actionData) {
  return {
    type: ActionTypes.EXECUTE_ACTION,
    actionName,
    actionData,
  }
}
