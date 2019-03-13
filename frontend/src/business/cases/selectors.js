import { createSelector } from 'reselect';
import { selectProperty } from 'utils/redux';

import { STATE_KEY } from './reducer';

export const memberAction = selectProperty([STATE_KEY, 'memberAction'], null);
export const getClaimantCases = selectProperty([STATE_KEY, 'claimantCases'], []);
export const getRespondantCases = selectProperty([STATE_KEY, 'respondantCases'], []);
export const getSelectedCaseId = selectProperty([STATE_KEY, 'selectedCaseId'], null);


export const getSelectedCase = createSelector(
  getClaimantCases,
  getRespondantCases,
  getSelectedCaseId,
  (claimantCases, respondantCases, caseId) => {
    if(caseId === undefined) return null;

    return []
      .concat(claimantCases)
      .concat(respondantCases)
      .find(c => c.case_id === caseId);

  }
);
