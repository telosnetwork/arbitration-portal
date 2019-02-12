import { ActionTypes } from 'const';

class BalancesAction {

    static setBalances({ id, owner, escrow }) {
        return {
            type: ActionTypes.SET_BALANCES,
            id,
            owner,
            escrow
        }        
    }
}

export default BalancesAction;