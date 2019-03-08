import { createSelector } from 'reselect';
import { selectProperty } from 'utils/redux';

import { STATE_KEY } from './reducer';

export const getCases = selectProperty([STATE_KEY, 'caseList'], []);
export const getSelectedCaseId = selectProperty([STATE_KEY, 'selectedCaseId'], []);

export const getSelectedCase = createSelector(
  getCases,
  getSelectedCaseId,
  (cases, caseId) => caseId !== undefined ? cases.find(c => c.case_id === caseId) : null,
);
