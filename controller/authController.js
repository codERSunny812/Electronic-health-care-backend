import User from "../Models/User.js";
import Doctor from "../Models/Doctor.js";
import Patient from "../Models/Patient.js";
import bcrypt from 'bcryptjs'


// register Doctor
export const RegisterDoctor = async  (req,res)=>{
    const { name, email, phoneNumber, licenseNumber, specialization, yearsOfExperience, password } = req.body;
    try {
        
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Doctor already exists' });
        }

        user = new User({
            email,
            phoneNumber,
            password,
            role:'doctor',  // Set the role here
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
export const RegisterPatient = async(req,res)=>{
    const { name, email, phoneNumber, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'Patient already exists' });
        }

        user = new User({
            email,
            phoneNumber,
            password,
            role:'patient',
        });

        const patient = new Patient({
            user: user._id,
            name,
        });

        await user.save();
        await patient.save();

        res.status(201).json({ 
            message:"patient successfully register"
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
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        res.json({ message:"patient successfully login" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};