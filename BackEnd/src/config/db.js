const mongoose = require("mongoose");

const connectDb= async()=>{
    try{
        const conn = await mongoose.connect('mongodb://localhost:27017/ekhana');
        console.log(`Connected: ${conn.connection.host}`) 

    }
    catch(err){
        console.err("failed",err);
        process.exit(1);

    }
}

module.exports =connectDb;

