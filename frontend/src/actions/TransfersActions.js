import { ActionTypes } from 'const';

class TransfersAction {

    static setTransfers({ trxHash, from, to, quantity, memo }) {
        return {
            type: ActionTypes.SET_TRANSFERS,
            trxHash,
            from,
            to,
            quantity,
            memo
        }        
    }
}

export default TransfersAction;