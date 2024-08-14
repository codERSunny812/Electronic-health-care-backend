import express from 'express'
import {bookAppointMent} from '../controller/appointmentController';

const router = express.Router();


router.get('/book',(req,res)=>{
    res.send("appointment booking route");
})