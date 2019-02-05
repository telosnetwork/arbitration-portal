import mongoose from 'mongoose';

const { Schema } = mongoose;

let Claim = null;

try {
    const ClaimSchema = new Schema({
        claim_id: {
            type:     Number,
            required: true
        },
        claim_summary: {
            type:     String,
            required: true
        },
        decision_link: {
            type:    String
        },
        decision_class: {
            type:    Number
        }
    });
    Claim = mongoose.model('Claim', ClaimSchema);
} catch (e) {
    Claim = mongoose.model('Claim');
}

export default Claim;