import mongoose from 'mongoose';

const { Schema } = mongoose;

let Joined = null;

try {
    const JoinedSchema = new Schema({
        join_id: {
            type:     Number,
            required: true
        },
        cases: [{
            type:     Number
        }],
        join_time: {
            type:     Number,
            required: true
        },
        joined_by: {
            type:     String,
            required: true
        }
    });
    Joined = mongoose.model('Joined', JoinedSchema);
} catch (e) {
    Joined = mongoose.model('Joined');
}

export default Joined;