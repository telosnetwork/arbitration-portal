import { BaseActionWatcher } from 'demux';
import { NodeosActionReader } from 'demux-eos';

import ActionHandler from './ActionHandler';

import updaters from './updaters';
import effects from './effects';
import Service from "../Service";

class DemuxService extends Service {
    constructor(driver, options) {
        super();
        this.handlerVersions = [{
            versionName: options.version,
            updaters,
            effects
        }];
        this.actionHandler = new ActionHandler(this.handlerVersions, driver);
        this.actionReader = new NodeosActionReader(options.endpoint, options.startBlock);
        this.actionWatcher = new BaseActionWatcher(
            this.actionReader,
            this.actionHandler,
            options.interval
        );
    }

    start() {
        this.actionWatcher.watch().then(() => {
            this.isRunning = true;
        });
    }

    onExit() {
        super.onExit();
        //TODO: update demux service state on exit
    }
}

export default DemuxService;

