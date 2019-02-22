import mongoose from 'mongoose';

const { Schema } = mongoose;

let Counter = null;

try {
    const CounterSchema = new Schema({
        case_counter: {
            type:    Number,
            default: 0
        },
        claim_counter: {
            type:    Number,
            default: 0
        }
    });
    Counter = mongoose.model('Counter', CounterSchema);
} catch (e) {
    Counter = mongoose.model('Counter');
}

export default Counter;