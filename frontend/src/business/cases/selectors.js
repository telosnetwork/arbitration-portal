import { selectProperty } from 'utils/redux';

import { STATE_KEY } from './reducer';

export const getCase = selectProperty([STATE_KEY], null);
