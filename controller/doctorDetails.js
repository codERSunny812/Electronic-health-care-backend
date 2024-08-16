import DoctorDetails from "../Models/doctorDetails.js";

// API to add doctor's details
export const addDoctorDetails = async (req, res) => {
    const { name, fees, yearsOfExperience, address, user_id } = req.body;

    try {
        const newDoctorDetails = new DoctorDetails({
            name,
            fees,
            yearsOfExperience,
            address,
            user_id
        });

        await newDoctorDetails.save();

        res.status(201).json({
            message: 'Doctor details saved successfully',
            doctor: newDoctorDetails
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

// API to fetch all doctor details
export const getAllDoctorDetails = async (req, res) => {
    try {
        const doctors = await DoctorDetails.find().populate('user_id', 'email'); // Populate user_id with email from User schema

        if (!doctors || doctors.length === 0) {
            return res.status(404).json({ message: 'No doctor details found' });
        }

        res.status(200).json(doctors);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};
