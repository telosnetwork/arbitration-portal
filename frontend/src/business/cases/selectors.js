import { selectProperty } from 'utils/redux';

import { STATE_KEY } from './reducer';

export const getCases = selectProperty([STATE_KEY], null);
