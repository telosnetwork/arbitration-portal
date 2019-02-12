import mongoose from 'mongoose';

const { Schema } = mongoose;

let Claim = null;

try {
    const ClaimSchema = new Schema({
        claim_id: {
            type:     Number,
            required: true,
            default:  0
        },
        claim_summary: {
            type:     String,
            required: true,
            default:  ''
        },
        decision_link: {
            type:    String,
            default: ''
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