import { selectProperty } from 'utils/redux';

import { STATE_KEY } from './reducer';
import {createSelector} from "reselect/lib/index";

import { getSelectedCase } from '../cases/selectors';

export const getSelectedClaimId = selectProperty([STATE_KEY, 'selectedClaimId'], null);

export const getClaims = createSelector(
  getSelectedCase,
  (casefile) => casefile ? [].concat(casefile.unread_claims).concat(casefile.accepted_claims) : []
);

export const getSelectedClaim = createSelector(
  getClaims,
  getSelectedClaimId,
  (claims, claimId) => claimId !== undefined ? claims.find(c => c.claim_id === claimId) : null,
);
