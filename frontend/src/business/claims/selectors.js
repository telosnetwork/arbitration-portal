import { selectProperty } from 'utils/redux';

import { STATE_KEY } from './reducer';

export const getClaims = selectProperty([STATE_KEY], null);