import caseFile from './case.js';
import claim from './claim';
import joinedCase from './joinedCase';
import transfer from './transfer';
import demuxState from './demuxState';

export default {
    case: caseFile,
    claim: claim,
    jCase: joinedCase,
    transfer: transfer,
    state: demuxState
};