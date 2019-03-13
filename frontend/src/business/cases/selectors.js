import { createSelector } from 'reselect';
import { selectProperty } from 'utils/redux';

import { STATE_KEY } from './reducer';

export const memberAction = selectProperty([STATE_KEY, 'memberAction'], null);
export const getClaimantCases = selectProperty([STATE_KEY, 'claimantCases'], []);
export const getRespondantCases = selectProperty([STATE_KEY, 'respondantCases'], []);
export const getSelectedCaseId = selectProperty([STATE_KEY, 'selectedCaseId'], null);

function lookFor(arrays, filter) {
  const founds = arrays.map(array => array.filter(filter)).flatten();
  return founds[0];
}

export const getSelectedCase = createSelector(
  getClaimantCases,
  getRespondantCases,
  getSelectedCaseId,
  (claimantCases, respondantCases, caseId) => {
    if(!caseId) return null;

    return lookFor([claimantCases, respondantCases], c => c.case_id === caseId);
  }
);
