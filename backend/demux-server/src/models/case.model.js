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
    case_status: {
        type:     Number,
        default:  0,
        required: true
    },
    claimants: [{
        type:    String,
        default: ''
    }],
    // respondants: [{
    //     type:    String,
    //     default: ''
    // }],
    arbitrators: [{
        type:    String,
        default: ''
    }],
    required_langs: [{
        type:    Number,
        default: 0
    }],
    unread_claims: [{
        type: mongoose.ObjectId,
        ref: 'Claim' // Schema Reference
    }],
    accepted_claims: [{
        type:    Number,
        default: 0
    }],
    case_ruling: {
        type:    String,
        default: ''
    }
    // arb_comment: {
    //     type: String,
    //     default: ''
    // },
    // last_edit: {
    //     type: Number,
    //     default: 0
    // }
});
Case = mongoose.model('Case', CaseSchema);
// } catch (e) {
//     Case = mongoose.model('Case');
// }

export default Case;