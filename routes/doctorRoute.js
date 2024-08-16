import express from 'express';
import { getDoctor } from '../controller/authController.js';
import { getAllDoctorDetails , addDoctorDetails } from '../controller/doctorDetails.js';



const router = express.Router();

// test route
router.get('/', (req, res) => {
    res.send('Hello from doctor  details route');
})

// router.get('/getDoctors', getDoctor);
router.post('/doctor-details', addDoctorDetails); // Route to add doctor's details
router.get('/doctor-details', getAllDoctorDetails); // Route to fetch all doctor's details



export default router;

