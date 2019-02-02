import mongoose from 'mongoose';

const { Schema } = mongoose;

let BlockIndexState = null;

try {
    const BlockIndexStateSchema = new Schema({
        blockNumber: {
            type:    Number,
            default: 0
        },
        blockHash: {
            type:    String,
            default: ''
        },
        isReplay: {
            type:    Boolean,
            default: false
        },
        handlerVersionName: {
            type:    String,
            default: 'v1'
        }
    });
    BlockIndexState = mongoose.model('BlockIndexState', BlockIndexStateSchema);
} catch (e) {
    BlockIndexState = mongoose.model('BlockIndexState');

}

export default BlockIndexState;