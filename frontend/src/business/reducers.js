import { combineReducers }   from 'redux';

import * as Authentication      from './authentication/reducer';
import * as Cases               from './cases/reducer';
import * as Claims               from './claims/reducer';
// import ArbitratorsReducer    from './ArbitratorsReducer';
// import BalancesReducer       from './BalancesReducers';
// import ClaimsReducers        from './ClaimsReducers';
// import JoinedCasesReducers   from './JoinedCasesReducers';
// import TransfersReducers     from './TransfersReducers';

export default combineReducers({
    [Authentication.STATE_KEY]: Authentication.reducer,
    [Cases.STATE_KEY]: Cases.reducer,
    [Claims.STATE_KEY]: Claims.reducer,
});
