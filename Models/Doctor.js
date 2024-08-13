import mongoose from 'mongoose';
import User from './User.js';

const doctorSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    name: {
        type: String,
        required: true,
    },
    licenseNumber: {
        type: String,
        required: true,
        unique: true,
    },
    specialization: {
        type: String,
        required: true,
    },
    yearsOfExperience: {
        type: Number,
        required: true,
    }
});

const Doctor = mongoose.model('Doctor',doctorSchema)



export default Doctor;
