const mongoose = require("mongoose");

const dbconnect =async()=>{
    try{
        mongoose.set("strictQuery",false);
        const conn=await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log(`Database connect to host : ${conn.connection.host}`);
    }catch(error){
           console.log(`error: mongodb connection error :${error}`);
    }
}

module.exports=dbconnect;