import Balance         from './balance.model';
import Claim           from './claim.model';
import Case            from './case.model';
import Joined          from './joinedCase.model';
import Transfer        from './transfer.model';
import BlockIndexState from './block-index-state.model';
// import BlockHist       from './block-state-hist.model';

export default {
    balance:         Balance,
    claim:           Claim,
    case:            Case,
    joined:          Joined,
    transfer:        Transfer,
    blockIndexState: BlockIndexState
    // blockhist:       BlockHist
};