import mongoose from 'mongoose';

let Schema = mongoose.Schema;
let Types = mongoose.SchemaTypes;

const BalanceSchema = new Schema({
    id: { type: mongoose.Number, required: true },
    owner: { type: String, required: true },
    escrow: { type: Types.Number, required: true }
});

export default mongoose.model("Balance", BalanceSchema);