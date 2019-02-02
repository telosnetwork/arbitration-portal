import mongoose from 'mongoose';

const { Schema } = mongoose;

let BlockHist = null;

// try {
const BlockHistSchema = new Schema({
    block: {
        type:     mongoose.ObjectId,
        ref:      'BlockIndexState',
        required: true
    }
});
BlockHist = mongoose.model('BlockHist', BlockHistSchema);
// } catch (e) {
//     BlockHist = mongoose.model('BlockHist');
// }

export default BlockHist;