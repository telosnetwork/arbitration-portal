import mongoose from 'mongoose';

const { Schema } = mongoose;

let Arbitrator = null;

try {
    const ArbitratorSchema = new Schema({
        name: {
            type: String
        },
        arb_status: {
            type: Number
        },
        open_case_ids: [{
            type: Number
        }],
        closed_case_ids: [{
            type: Number
        }],
        credentials_link: {
            type: String
        },
        elected_time: {
            type: Number
        },
        term_expiration: {
            type: Number
        },
        languages: [{
            type: Number
        }]
    });
    Arbitrator = mongoose.model('Arbitrator', ArbitratorSchema);
} catch (e) {
    Arbitrator = mongoose.model('Arbitrator');
}

export default Arbitrator;