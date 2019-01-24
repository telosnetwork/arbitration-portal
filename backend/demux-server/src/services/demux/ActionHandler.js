import {AbstractActionHandler} from 'demux'
import colors from "colors";
import models from '../../mongoose/models';

let state = {
    indexState: {
        blockNumber: 0,
        blockHash: "",
        isReplay: false,
        handlerVersionName: "v1",

    },
    models: models
};

const stateHistory = {};
const stateHistoryMaxLength = 300;

class ActionHandler extends AbstractActionHandler {
    constructor(actionsHandler) {
        super(actionsHandler);
    }

    async handleWithState(handle) {
        await handle(state);
        const { blockNumber } = state.indexState;
        stateHistory[blockNumber] = JSON.parse(JSON.stringify(state));
    }

    async updateIndexState(stateObj, block, isReplay, handlerVersionName) {
        stateObj.indexState.blockNumber = block.blockInfo.blockNumber;
        stateObj.indexState.blockHash = block.blockInfo.blockHash;
        stateObj.indexState.isReplay = isReplay;
        stateObj.indexState.handlerVersionName = handlerVersionName;
    }

    async loadIndexState() {
        return state.indexState;
    }

    async rollbackTo(blockNumber) { console.log(blockNumber);
        const latestBlockNumber = state.indexState.blockNumber
        const toDelete = [...Array(latestBlockNumber - (blockNumber)).keys()].map(n => n + blockNumber + 1)
        for (const n of toDelete) {
            delete stateHistory[n]
        }
        state = stateHistory[blockNumber]
    }
}

export default ActionHandler