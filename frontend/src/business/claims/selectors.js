import { selectProperty } from 'utils/redux';

import { STATE_KEY } from './reducer';

import {createSelector} from "reselect/lib/index";

import { getSelectedCase } from '../cases/selectors';

export const getSelectedClaimSummary = selectProperty([STATE_KEY, 'selectedClaimSummary'], null);

export const getClaims = createSelector(
  getSelectedCase,
  (casefile) => casefile ? [].concat(casefile.unread_claims).concat(casefile.accepted_claims) : []
);

export const getSelectedClaim = createSelector(
  getClaims,
  getSelectedClaimSummary,
  (claims, claimSummary) => claimSummary !== undefined ? claims.find(c => c.claim_summary === claimSummary) : null,
);

// export const getClaims = selectProperty([STATE_KEY], null);
