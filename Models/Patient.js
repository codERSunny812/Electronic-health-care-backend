import mongoose from 'mongoose';
import User from './User.js';

const patientSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    name: {
        type: String,
        required: true,
    }
});

const Patient = mongoose.model('Patient',patientSchema)

export default Patient;

