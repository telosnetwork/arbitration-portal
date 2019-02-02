import mongoose from 'mongoose';

const { Schema } = mongoose;

let Transfer = null;

try {
    const TransferSchema = new Schema({
        trxHash: { 
            type:     String, 
            default:  '', 
            trim:     true, 
            required: true 
        },
        from: { 
            type:     String, 
            default:  '', 
            trim:     true, 
            required: true  
        },
        to: { 
            type:     String, 
            default:  '', 
            trim:     true, 
            required: true  
        },
        quantity: { 
            type:     String, 
            default:  '', 
            trim:     true, 
            required: true 
        },
        memo: { 
            type:     String, 
            default:  '', 
            trim:     true 
        }
    });
    Transfer = mongoose.model('Transfer', TransferSchema);
} catch (e) {
    Transfer = mongoose.model('Transfer');
}

export default Transfer;