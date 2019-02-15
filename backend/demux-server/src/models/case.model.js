import mongoose from 'mongoose';

const { Schema } = mongoose;

let Case = null;

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
        response_link: {
            type:    String,
            default: ''
        },
        decision_class: {
            type:    Number
        }
    });
    
    const CaseSchema = new Schema({
        case_id: {
            type:     Number,
            required: true,
            default:  0
        },
        case_status: {
            type:     Number,
            required: true,
            default:  0
        },
        claimant: {
            type:    String,
            default: ''
        },
        respondant: {
            type:    String,
            default: ''
        },
        arbitrators: [{
            type:    String,
            default: ''
        }],
        approvals: [{
            type:    String,
            default: ''
        }],
        required_langs: [{
            type:    Number
        }],
        unread_claims: [{
            type: ClaimSchema
        }],
        accepted_claims: [{
            type:    Number,
            default: 0
        }],
        case_ruling: {
            type:    String,
            default: ''
        },
        arb_comment: {
            type: String,
            default: ''
        }
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