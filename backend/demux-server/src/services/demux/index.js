import { BaseActionWatcher } from 'demux';
import { NodeosActionReader } from 'demux-eos';

import ActionHandler from './ActionHandler';

import updaters from './updaters';
import effects from './effects';

const handlerVersions = [{
    versionName: "v1",
    updaters,
    effects
}];

const actionHandler = new ActionHandler(handlerVersions, process.env.MONGODB_URL);

const actionReader = new NodeosActionReader(
    process.env.TELOS_ENDPOINT,
    parseInt(process.env.STARTING_BLOCK, 10) // First actions relevant to this dapp happen at this block
);

const actionWatcher = new BaseActionWatcher(
    actionReader,
    actionHandler,
    250
);

export default actionWatcher;