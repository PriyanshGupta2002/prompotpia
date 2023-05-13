import mongoose, { Mongoose, mongo } from "mongoose";

let isConnected = false;

export const connectToDb=async()=>{
    mongoose.set('strictQuery',true)
    if (isConnected) {
        console.log("Connected to db")
        return
    }
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        isConnected=true;
        console.log("Mongo Db Connected")
    } catch (error) {
            console.log(error)
    }
}