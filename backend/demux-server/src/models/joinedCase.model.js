import mongoose from 'mongoose';

const { Schema } = mongoose;

let Joined = null;

try {
    const JoinedSchema = new Schema({
        join_id: {
            type:     Number,
            required: true,
            default:  0
        },
        cases: [{
            type:    Number,
            default: 0
        }],
        join_time: {
            type:     Number,
            required: true,
            default:  0
        },
        joined_by: {
            type:     String,
            required: true,
            default:  0
        }
    });
    Joined = mongoose.model('Joined', JoinedSchema);
} catch (e) {
    Joined = mongoose.model('Joined');
}

export default Joined;