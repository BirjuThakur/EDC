const jwt = require("jsonwebtoken");
const Register = require("../modals/register");

const auth = async(req,res,next)=>{
    try {
        const token = req.cookies.jwt;
        const userveirfy = jwt.verify(token,"mkolpijunhygtbvfredcxswqazsdfghjkloiu");
        const user = await Register.findOne({_id:userveirfy._id, "tokens.token":token});
        if(!user){throw new Error('user not found')};
        req.token =token;
        req.user =user;
        req.userid = user._id;
        next();
    } catch (error) {
        res.status(401).send("unauthorizes error"); 
        console.log(error)
    }
}

module.exports =auth;