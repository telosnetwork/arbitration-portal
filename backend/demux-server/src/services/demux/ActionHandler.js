import {AbstractActionHandler} from 'demux'
import models from '../../models';

import colors from "colors";


//TODO: move state to
let state = {
    indexState: {
        blockNumber: 0,
        blockHash: "",
        isReplay: false,
        handlerVersionName: "v1",

    },
    models: models
};

class ActionHandler extends AbstractActionHandler {
    constructor(actionsHandler) {
        super(actionsHandler);
    }

    async handleWithState(handle) {
        await handle(state);

        //TODO: update demux service state history
    }

    async updateIndexState(stateObj, block, isReplay, handlerVersionName) {
        //TODO: update state object in mongodb

        //How often should the state be updated in mongo...
        // console.log("updating state index state");
    }

    //TODO: on exception, update demux state in mongo

    async loadIndexState() { //Called on launch of service
        //TODO: update mongo state
        console.log('loading state index');
        return state.indexState;
    }

    async rollbackTo(blockNumber) {
        //TODO: possibly remove elements from db where blockNum > N
        console.log('rolling backing to: ', blockNumber);
    }
}

export default ActionHandler