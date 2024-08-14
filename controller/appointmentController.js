import Appointment from "../Models/Appointment";
import Doctor from "../Models/Doctor";
import Patient from "../Models/Patient";


export const bookAppointMent = async ()=>{

    const {doctorId , appointmentDate} = req.body;

    const patientId = req.user.id;

    try {

        const doctor = await Doctor.findById(doctorId);

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        const patient = await Patient.findOne({ user: patientId });
        
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        const appointment = new Appointment({
            patient: patient._id,
            doctor: doctor._id,
            appointmentDate,
        });

        await appointment.save();

        res.status(201).json({ message: 'Appointment booked successfully' });
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
        
    }
}