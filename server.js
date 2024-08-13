import express   from 'express'
import { connectDB } from './Database/Db.js';
import dotenv from 'dotenv'; 
import authRoute from './routes/auth.js'

// Load environment variables from .env file
dotenv.config();


const app = express();
app.use(express.json());

//data base connnection 
connectDB();







//using the route 
app.use('/api/auth',authRoute)



app.get('/',(req,res)=>{
    res.send('Hello World!');
});


// start the  server
//port allocation
const port = process.env.PORT || 3002;

app.listen(port,()=>{
    console.log(`server  is running ${port}`)
});



