const express=require('express');
const router=express.Router();
const createuser=require('../controllers/createuser');
const foodData=require('../controllers/getfooddata');
const logIn=require('../controllers/login')



router.post("/createuser",createuser);
router.post("/login",logIn);
router.get("/fooddata",foodData);



module.exports=router;
