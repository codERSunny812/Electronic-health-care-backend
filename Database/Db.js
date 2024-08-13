import dotenv from 'dotenv';
import mongoose from 'mongoose';


// Load environment variables
dotenv.config();


export const connectDB = () => {
    // connection to the database
    mongoose
        .connect("mongodb+srv://sengersunny448:6m3yCwablgJGSHXC@cluster0.hkapb.mongodb.net")
        .then(() => {
            console.log("the mongodb is successfully connected");
        })
        .catch((error) => {
            console.log(`error in connecting with mongodb server ${error.message}`);
            process.exit(1);
        });
};
