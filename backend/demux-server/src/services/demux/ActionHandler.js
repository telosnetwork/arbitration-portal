import { AbstractActionHandler } from 'demux'
import models from '../../models';
import io     from '../../utils/io';

const stateHist = {};
const stateHistMaxLength = 200;

class ActionHandler extends AbstractActionHandler {

  constructor(actionsHandler) {
    super(actionsHandler);
  }

  async handleWithState(handle) {
    const context = { socket: io.getSocket() }
    const state = models;
    try {
      await handle(state, context); // Passed to all calls of Updaters.APPLY & Effects.RUN

      // Update Demux Service State Hist
      let blockNumber;
      const indexState = await state.blockIndexState.findOne({}).exec();
      if (indexState) {
        ({ blockNumber } = indexState)
      }

      stateHist[blockNumber] = indexState;
      if ( blockNumber > stateHistMaxLength && stateHist[blockNumber - stateHistMaxLength] ) {
        delete stateHist[blockNumber - stateHistMaxLength];
      }
      console.log('StateHist Length: ', Object.keys(stateHist).length);
    } catch (err) {
      console.error(err);
    }
  }

  async updateIndexState(state, block, isReplay, handlerVersionName) {
    const { blockInfo } = block;
    console.log(`Updating Index State... Block number ${blockInfo.blockNumber}`);
    try {
      await state.blockIndexState.updateOne({}, {
        blockNumber:        blockInfo.blockNumber,
        blockHash:          blockInfo.blockHash,
        isReplay:           isReplay,
        handlerVersionName: handlerVersionName
      }, { upsert: true }).exec();
    } catch (err) {
      console.error(err);
    }
  }

  async loadIndexState() {
    console.log('Loading Index State...');
    try {
      const indexState = await models.blockIndexState.findOne({}).exec();
      if (indexState) {
        return indexState;
      } else {
        return { blockNumber: 0, blockHash: '', isReplay: false, handlerVersionName: 'v1' }
      }
    } catch (err) {
      console.error(err);
    }
  }

  async rollbackTo(blockNumber) {
    console.log('Rolling Back to BlockNumber:', blockNumber);

    let latestBlockNumber;
    try {
      const indexState = await models.blockIndexState.findOne({}).exec();
      if (indexState) {
        latestBlockNumber = indexState.blockNumber;
      }

      const toDelete = [...Array(latestBlockNumber - (blockNumber)).keys()].map(n => n + blockNumber + 1)

      for (const n of toDelete) {
        delete stateHist[n]
      }

      await models.blockIndexState.updateOne({
        blockNumber:        stateHist[blockNumber].blockNumber,
        blockHash:          stateHist[blockNumber].blockHash,
        isReplay:           stateHist[blockNumber].isReplay,
        handlerVersionName: stateHist[blockNumber].handlerVersionName
      }, { upsert: true }).exec();
    } catch (err) {
      console.error(err);
    }
  }
}

export default ActionHandler;
