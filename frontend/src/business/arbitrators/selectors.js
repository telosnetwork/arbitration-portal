import { selectProperty } from 'utils/redux';

import { STATE_KEY } from './reducer';

export const getArbitrators = selectProperty([STATE_KEY, 'arbitratorList'], []);
