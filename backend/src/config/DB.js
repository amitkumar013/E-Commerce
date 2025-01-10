import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`);
        console.log("MongoDB connected...");
    } catch (error) {
        console.error(`MONGODB Connection Faild!! ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;
