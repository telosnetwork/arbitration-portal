import mongoose from 'mongoose';

const { Schema } = mongoose;

let Joined = null;

try {
    const JoinedSchema = new Schema({
        join_id: {
            type:     Number,
            default:  0,
            required: true
        },
        cases: [{
            type:     Number,
            default:  0
        }],
        join_time: {
            type:     Number,
            default:  0,
            required: true
        },
        joined_by: {
            type:     String,
            default:  '',
            required: true
        }
    });
    Joined = mongoose.model('Joined', JoinedSchema);
} catch (e) {
    Joined = mongoose.model('Joined');
}

export default Joined;