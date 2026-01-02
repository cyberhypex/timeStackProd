const mongoose=require('mongoose');
const connection=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_ATLAS_URI);
        console.log("Database connected successfully");
    }
    catch(err){
        console.log("Database connection failed",err);
    }
}
module.exports=connection;