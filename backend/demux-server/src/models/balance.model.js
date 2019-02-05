import mongoose from 'mongoose';

const { Schema } = mongoose;

let Balance = null;

try {
    const BalanceSchema = new Schema({
        id: {
            type:     Number,
            required: true
        },
        owner: {
            type:     String,
            required: true
        },
        escrow: { // Amount held from the Contract Account
            type:     Number,
            required: true
        }
    });
    Balance = mongoose.model('Balance', BalanceSchema);
} catch (e) {
    Balance = mongoose.model('Balance');
}

export default Balance; // Compile to Model - Class to Construct Documents (Instances of a Model Class)