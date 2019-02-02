import mongoose from 'mongoose';

const { Schema } = mongoose;

let Joined = null;

// try {
const JoinedSchema = new Schema({
    id: {
        type:     Number,
        required: true
    },
    cases: [{
        type: mongoose.ObjectId,
        ref: 'Case'
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
// } catch (e) {
//     Joined = mongoose.model('Joined');
// }

export default Joined;