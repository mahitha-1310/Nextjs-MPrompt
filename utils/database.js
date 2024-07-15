import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async() => {
    mongoose.set('strictQuery', true);

    if(isConnected) {
        console.log("DB connected");
        return;
    }

    // try{
    //     await mongoose.connect(process.env.MONGODB_URI, {
    //         dbName:"share_prompt",
    //         serverSelectionTimeoutMS: 50000,
    //         // useNewUrlParser: true,
    //         // useUnifiedTopology: true
    //     })

    //     isConnected = true;

    //     console.log("MongoDB connected")
    // }
    // catch(error){
    //     console.log(error)
    // }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            serverSelectionTimeoutMS: 50000,
        });
    
        isConnected = true;
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        console.error("Full error:", error);
        throw new Error("Unable to connect to MongoDB");
    }
    
}