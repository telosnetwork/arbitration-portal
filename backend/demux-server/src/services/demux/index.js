import { BaseActionWatcher }  from 'demux';
import { NodeosActionReader, MongoActionReader } from 'demux-eos';

import ActionHandler from './ActionHandler';

import effects  from './effects';
import updaters from './updaters';
import Service  from '../Service';

class DemuxService extends Service {
    constructor(driver, options) { // Driver: Models, Options: JSON object with version, endpoint, startBlock and interval
        super();

        this.handlerVersions = [{
            effects,
            updaters,
            versionName: options.version
        }];

        this.actionHandler = new ActionHandler(this.handlerVersions, driver); // driver?

        // NodeosActionReader
        this.actionReader  = new NodeosActionReader(options.endpoint, options.startBlock); // Public Nodeos Endpoint as a source of Block Data & Starting Block

        // MongoActionReader
        // this.actionReader = new MongoActionReader(options.endpoint, options.startBlock);

        // Base Class coordinate the Action Reader and the Action Handler
        this.actionWatcher = new BaseActionWatcher(
            this.actionReader,
            this.actionHandler, // Passing through Block Information from the Reader to the Handler
            options.interval    // Polling Loop interval in ms - Since EOS has a 0.5 block time - set to half of that for an average of 125 ms DELAY
        );
    }

    start() {
        // this.actionReader.initialize().then(() => {
            this.actionWatcher.watch().then(() => { // Start Polling Loop based on Polling Loop interval
                this.isRunning = true;
            });
        // }):
    }

    onExit() {
        super.onExit();
    }
}

export default DemuxService;

