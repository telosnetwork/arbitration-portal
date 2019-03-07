import { combineReducers }   from 'redux';

// import ArbitratorsReducer    from './ArbitratorsReducer';
// import BalancesReducer       from './BalancesReducers';
// import CasesReducer          from './CasesReducers';
// import ClaimsReducers        from './ClaimsReducers';
// // import JoinedCasesReducers from './JoinedCasesReducers';
// import TransfersReducers     from './TransfersReducers';
import AuthenticationReducer from './AuthenticationReducer';

export default combineReducers({
    // arbitrators:    ArbitratorsReducer,
    // balances:       BalancesReducer,
    // cases:          CasesReducer,
    // claims:         ClaimsReducers,
    // // joinedcases: JoinedCasesReducers,
    // transfers:      TransfersReducers,
    authentication: AuthenticationReducer
});