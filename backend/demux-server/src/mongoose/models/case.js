import mongoose from 'mongoose';

let Schema = mongoose.Schema;
let Types = mongoose.SchemaTypes;

const CaseSchema = new Schema({
    case_id: { type: mongoose.Number, required: true },
    status: { type: mongoose.Number, required: true },
    claimants: [String],
    arbitrators: [String],
    languages: [String],
    unread_claims: [{ type: Types.ObjectId, ref: 'Claim', }],
    accepted_claims: [{ type: Types.ObjectId, ref: 'Claim', }],
    case_ruling: { type: String }
});

export default mongoose.model("Case", CaseSchema);