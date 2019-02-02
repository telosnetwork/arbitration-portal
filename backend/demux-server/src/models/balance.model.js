import mongoose from 'mongoose';

const { Schema } = mongoose;

let Balance = null;

try {
    const BalanceSchema = new Schema({
        id: {
            type:     Number,
            default:  0,
            required: true
        },
        owner: {
            type:     String,
            default:  '',
            required: true
        },
        escrow: { // Amount held from the Contract Account
            type:     Number,
            default:  0,
            required: true
        }
    });
    Balance = mongoose.model('Balance', BalanceSchema);
} catch (e) {
    Balance = mongoose.model('Balance');
}

export default Balance; // Compile to Model - Class to Construct Documents (Instances of a Model Class)