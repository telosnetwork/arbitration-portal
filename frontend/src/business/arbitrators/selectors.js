import { selectProperty } from 'utils/redux';

import { STATE_KEY } from './reducer';
import { AuthenticationSelectors } from "../selectors";
import {createSelector} from "reselect/lib/index";

export const getArbitrators = selectProperty([STATE_KEY, 'arbitratorList'], []);

export const isArbitrator = createSelector(
  AuthenticationSelectors.isLogin,
  AuthenticationSelectors.account,
  getArbitrators,
  (isLogin, account, arbitrators) => {

    if(!isLogin) return false;

    return !!arbitrators.find(a => a.arb === account.name);

  }
);
