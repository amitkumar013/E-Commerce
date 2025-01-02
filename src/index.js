import dotenv from 'dotenv';
import connectDB from './config/DB.js';
 

dotenv.config({
    path: './.env'
});

connectDB();
