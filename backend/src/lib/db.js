import mongoose from "mongoose";

export const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`CONNECTED TO DB SUCCESSFULY:${conn.connection.host}`);
    }catch(err){
        console.log("connection fail", err)
    }
}