import mongoose from 'mongoose';

const { Schema } = mongoose;

let Balance = null;

try {
    const BalanceSchema = new Schema({
        id: {
            type:     Number,
            required: true,
            default:  0
        },
        owner: {
            type:     String,
            required: true,
            default:  ''
        },
        escrow: { // Amount held from the Contract Account
            type:     Number,
            required: true,
            default:  0
        }
    });
    Balance = mongoose.model('Balance', BalanceSchema);
} catch (e) {
    Balance = mongoose.model('Balance');
}

export default Balance; // Compile to Model - Class to Construct Documents (Instances of a Model Class)