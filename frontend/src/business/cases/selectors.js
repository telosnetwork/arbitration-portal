import { createSelector } from 'reselect';
import { selectProperty } from 'utils/redux';

import { STATE_KEY } from './reducer';

export const getClaimantCases = selectProperty([STATE_KEY, 'claimantCases'], []);
export const getRespondantCases = selectProperty([STATE_KEY, 'respondantCases'], []);
export const getArbitratorCases = selectProperty([STATE_KEY, 'arbitratorCases'], []);
export const getSelectedCaseId = selectProperty([STATE_KEY, 'selectedCaseId'], null);


export const getSelectedCase = createSelector(
  getClaimantCases,
  getRespondantCases,
  getArbitratorCases,
  getSelectedCaseId,
  (claimantCases, respondantCases, arbitratorCases, caseId) => {
    if(caseId === undefined) return null;

    return []
      .concat(claimantCases)
      .concat(respondantCases)
      .concat(arbitratorCases)
      .find(c => c.case_id === caseId);

  }
);
