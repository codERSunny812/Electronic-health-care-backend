import mongoose from 'mongoose';

const doctorDetailsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    fees: {
        type: Number,
        required: true,
    },
    yearsOfExperience: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    user_id: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'User',
        // required: true,
        type:String
    }
}, { timestamps: true });


const DoctorDetails = mongoose.model('DoctorDetails', doctorDetailsSchema);

export default DoctorDetails;
