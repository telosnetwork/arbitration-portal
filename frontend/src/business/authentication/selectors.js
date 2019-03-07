import { selectProperty } from 'utils/redux';

import { STATE_KEY } from './reducer';

export const isLogin = selectProperty([STATE_KEY, 'isLogin'], false);
export const account = selectProperty([STATE_KEY, 'account'], null);
