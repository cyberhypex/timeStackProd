const express=require('express');
const app=express();

const cors=require('cors');
app.use(cors());

app.get("/health",(req,res)=>{
    res.status(200).send("API is running...");
})
const dotenv=require('dotenv').config();
const port=process.env.PORT || 5000;
app.use(express.json());

const connectDB=require('./Config/DBConnection');
connectDB();

app.use('/user',require('./Routes/UserRoutes'));
app.use('/task',require('./Routes/TaskRoutes'));
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})