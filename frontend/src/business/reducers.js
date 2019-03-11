import { combineReducers }   from 'redux';

import * as Authentication      from './authentication/reducer';
import * as Cases               from './cases/reducer';

import * as Claims              from './claims/reducer';
//import * as Arbitrators         from './arbitrators/reducer';

export default combineReducers({
    [Authentication.STATE_KEY]: Authentication.reducer,
    [Cases.STATE_KEY]: Cases.reducer,
    [Claims.STATE_KEY]: Claims.reducer,
});
//     [Arbitrators.STATE_KEY]: Arbitrators.reducer
// });
