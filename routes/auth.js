import express from 'express';
import { RegisterDoctor, RegisterPatient, LoginUser } from '../controller/authController.js';

const router = express.Router();

router.get('/register', (req, res) => {
    res.send("hello from the register route");
})

router.post('/register/doctor', RegisterDoctor);
router.get('/register/doctor',(req,res)=>{
    res.send("hello from the doctor register route");
})
router.post('/register/patient', RegisterPatient);
router.get('/register/patient',(req,res)=>{
    res.send("hello from the patient route")
})
router.post('/login', LoginUser);

export default router;

