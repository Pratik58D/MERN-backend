const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const mongoUrl = process.env.MONGO_URI;

const connectDb= async()=>{
    try{
        const conn = await mongoose.connect(mongoUrl);
        console.log(`Connected: ${conn.connection.host}`) 

    }
    catch(err){
        console.log("failed",err);
        process.exit(1);

    }
}

module.exports =connectDb;

