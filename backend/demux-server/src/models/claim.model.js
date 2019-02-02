import mongoose from 'mongoose';

const { Schema } = mongoose;

let Claim = null;

try {
    const ClaimSchema = new Schema({
        id: {
            type:     Number,
            default:  0,
            required: true
        },
        accepted: {
            type:     Boolean,
            default:  false,
            required: true
        },
        summary: {
            type:     String,
            default:  '',
            required: true
        },
        decision_link: {
            type:    String,
            default: ''
        },
        decision_class: {
            type:    Number,
            default: 0
        }
    });
    Claim = mongoose.model('Claim', ClaimSchema);
} catch (e) {
    Claim = mongoose.model('Claim');
}

export default Claim;