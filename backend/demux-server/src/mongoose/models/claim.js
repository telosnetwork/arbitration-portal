import mongoose from 'mongoose';

let Schema = mongoose.Schema;
let Types = mongoose.SchemaTypes;

const ClaimSchema = new Schema({
    id: { type: mongoose.Number, required: true },
    accepted: { type: Boolean, required: true},
    summary: { type: String, required: true },
    decision_link: { type: String },
    decision_class: { type: mongoose.Number }
});

export default mongoose.model("Claim", ClaimSchema);