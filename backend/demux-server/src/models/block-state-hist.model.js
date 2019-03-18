import mongoose from 'mongoose';

const { Schema } = mongoose;

let BlockHist = null;

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
    
    const BlockHistSchema = new Schema({
        block: [{
            type: BlockIndexStateSchema
        }]
    });
    BlockHist = mongoose.model('BlockHist', BlockHistSchema);
} catch (e) {
    BlockHist = mongoose.model('BlockHist');
}

export default BlockHist;