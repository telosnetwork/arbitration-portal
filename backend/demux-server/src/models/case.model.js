import mongoose from 'mongoose';

const { Schema } = mongoose;

let Case = null;

// try {
const CaseSchema = new Schema({
    case_id: {
        type:     Number,
        default:  0,
        required: true
    },
    status: {
        type:     Number,
        default:  0,
        required: true
    },
    claimants:   [String],
    arbitrators: [String],
    languages:   [String],
    unread_claims: [{
        type: mongoose.ObjectId,
        ref: 'Claim' // Schema Reference
    }],
    accepted_claims: [{
        type: mongoose.ObjectId,
        ref: 'Claim'
    }],
    case_ruling: {
        type:    String,
        default: ''
    }
});
Case = mongoose.model('Case', CaseSchema);
// } catch (e) {
//     Case = mongoose.model('Case');
// }

export default Case;