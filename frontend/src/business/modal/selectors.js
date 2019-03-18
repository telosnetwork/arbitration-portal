import { selectProperty } from 'utils/redux';

import { STATE_KEY } from './reducer';

export const action = selectProperty([STATE_KEY, 'action'], null);
export const actionLoading = selectProperty([STATE_KEY, 'actionLoading'], false);

