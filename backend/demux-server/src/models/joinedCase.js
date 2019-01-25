import mongoose from 'mongoose';

let Schema = mongoose.Schema;
let Types = mongoose.SchemaTypes;

const JoinedSchema = new Schema({
    id: {type: mongoose.Number, required: true },
    cases: [{ type: Types.ObjectId, ref: 'Case'}],
    join_time: { type: mongoose.Number, required: true },
    joined_by: { type: String, required: true}
});

export default mongoose.model("Joinder", JoinedSchema);