const express=require('express')
const router=express.Router()



const {userSignUp,userLogin}=require('../Controller/UserController');






router.post("/createUser", userSignUp);
router.post("/login",userLogin)




module.exports=router;