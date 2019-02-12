import mongoose from 'mongoose';

const { Schema } = mongoose;

let Arbitrator = null;

try {
    const ArbitratorSchema = new Schema({
        arb: {
            type:    String,
            default: ''
        },
        arb_status: {
            type:    Number,
            default: 0
        },
        open_case_ids: [{
            type:    Number,
            default: 0
        }],
        closed_case_ids: [{
            type:    Number,
            default: 0
        }],
        credentials_link: {
            type:    String,
            default: ''
        },
        elected_time: {
            type:    Number,
            default: 0
        },
        term_expiration: {
            type:    Number,
            default: 0
        },
        languages: [{
            type:    Number
        }]
    });
    Arbitrator = mongoose.model('Arbitrator', ArbitratorSchema);
} catch (e) {
    Arbitrator = mongoose.model('Arbitrator');
}

export default Arbitrator;