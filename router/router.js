const express =require("express");
const router = express.Router();
const jwt =require("jsonwebtoken");
const cookieParser= require("cookie-parser");
//cookie parser for authuntification
router.use(cookieParser());

//databse and schema connection
require("../db/connection");
const Register = require("../modals/register");
//require authnatification
const auth = require("../autontification/auth");
//require applicatnts 
const Appicatnts = require("../modals/stage1");

//for storing data in mongodb
router.use(express.json());
router.use(express.urlencoded({extended:false}))

router.get("/",(req,res) =>{
    res.send("hello router")
})

router.get("/about",(req,res) =>{
    res.send("this is about page")
})

router.get("/stage1",auth, (req,res) =>{
    console.log(req.user)
    res.send(req.user)
})

router.post("/stage1",async(req,res) =>{
try {
    const newApplication = new Appicatnts(req.body);
    console.log(newApplication)
    await newApplication.save();
    res.status(201).json({ success: true, data: newApplication });
} catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
}
});

//registration 
router.get("/register",async(req,res) =>{
    try {
        const regdata = await Register.find();
        res.send(regdata);
    } catch (error) {
        res.send("not getting data");
    }
})

router.post("/register",async(req,res) =>{
    const { fname,lname,email,mobileno,password,userType,companyName } = req.body;
    try {
        let user = new Register({fname,lname,email,mobileno,password,userType,companyName})
        await user.save();
        console.log(user)
        res.status(201).json({message:"user send data successfully"});
    } catch (error) {
        res.send("user invalid registration")
    }
})

//login 
router.post("/sinin",async(req,res)=>{
    try {
        const { email,password } = req.body;
        if(!email || !password){
            return res.status(400).json({Error:"please fill the data"})
        }
        const userlogin = await Register.findOne({email});
        console.log("userlogin "+userlogin)
        if (!userlogin) {
            return res.status(400).json({ error: "User not found" });
        }
        if(password===userlogin.password){
            //token generate
            const token = await userlogin.generateToken();
            console.log(token);
            //cookies storing in 
            res.cookie("jwt",token,{
                expires:new Date(Date.now()+25892000000),
                httpOnly:true
        })
            return res.status(201).json({message:"user log in successfully"})
        }else{
            return res.status(400).json({ error: "please fill proper details" })
        }
    } catch (error) {
       console.log("please fill data correct"+error)
    }
    
})

router.get("/logout",(req,res) =>{
res.clearCookie("jwt",{path:"/"})
res.status(200).send("user logout");
});

module.exports=router;