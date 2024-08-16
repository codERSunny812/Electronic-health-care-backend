import User from "../Models/User.js";
import Doctor from "../Models/Doctor.js";
import Patient from "../Models/Patient.js";
import bcrypt from 'bcryptjs'


// register Doctor
export const RegisterDoctor = async (req, res) => {
    const { name, email, phoneNumber, licenseNumber, specialization, yearsOfExperience, password } = req.body;
    try {

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Doctor already exists' });
        }

        // hasing the password
        const hashedPassword=await bcrypt.hash(password,10);

        user = new User({
            email,
            phoneNumber,
            password:hashedPassword,
            role: 'doctor',  // Set the role here
        });

        const doctor = new Doctor({
            user: user._id,
            name,
            licenseNumber,
            specialization,
            yearsOfExperience,
        });

        await user.save();
        await doctor.save();



        res.status(201).json({
            message: 'Doctor created successfully',
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }

}

// register the patient
export const RegisterPatient = async (req, res) => {
    const { name, email, phoneNumber, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Patient already exists' });
        }

        // hasing the password
        const hashedPassword = await bcrypt.hash(password, 10);


        user = new User({
            email,
            phoneNumber,
            password:hashedPassword,
            role: 'patient',
        });

        const patient = new Patient({
            user: user._id,
            name,
        });

        await user.save();
        await patient.save();

        res.status(201).json({
            message: "patient successfully register"
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
}

// Login User
export const LoginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        //find user by email
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Based on the role, retrieve additional information (Doctor or Patient)
        let userData = null;
        if (user.role === 'doctor') {
            userData = await Doctor.findOne({ user: user._id });
        } else if (user.role === 'patient') {
            userData = await Patient.findOne({ user: user._id });
        }

        // Respond with the user data including role and name
        res.json({
            message: "User successfully logged in",
            user: {
                id:user._id,
                email: user.email,
                role: user.role,
                name: userData ? userData.name : null, // Include the name from the related schema
            }
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};


export const getDoctor = async (req, res) => {
    try {
        // Find all users with the role 'doctor'
        const doctors = await User.find({ role: 'doctor' })
        // .populate({
        //     path: 'doctor', // Assuming that you have referenced the `Doctor` schema from `User`
        //     model: Doctor
        // });

        if (!doctors || doctors.length === 0) {
            return res.status(404).json({ message: 'No doctors found' });
        }

        res.status(200).json(doctors);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};