import mongoose from 'mongoose';

const { Schema } = mongoose;

let Case = null;

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
    
    const CaseSchema = new Schema({
        case_id: {
            type:     Number,
            required: true
        },
        case_status: {
            type:     Number,
            required: true
        },
        claimants: [{
            type:    String
        }],
        // respondants: [{
        //     type:    String,
        //     default: ''
        // }],
        arbitrators: [{
            type:    String
        }],
        required_langs: [{
            type:    Number
        }],
        unread_claims: [{
            type: ClaimSchema
        }],
        // unread_claims: [{
        //     type: mongoose.ObjectId,
        //     ref: 'Claim' // Schema Reference
        // }],
        accepted_claims: [{
            type:    Number
        }],
        case_ruling: {
            type:    String
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
} catch (e) {
    Case = mongoose.model('Case');
}

export default Case;