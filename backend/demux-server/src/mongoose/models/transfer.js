import mongoose from 'mongoose';

let Schema = mongoose.Schema;

const TransferSchema = new Schema({
    trxHash: { type: String, default: '', trim: true, required: true },
    from: { type: String, default: '', trim: true, required: true  },
    to: { type: String, default: '', trim: true, required: true  },
    quantity: { type: String, default: '', trim: true, required: true },
    memo: { type: String, default: '', trim: true }
});



export default mongoose.model("Transfer", TransferSchema);