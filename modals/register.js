const mongoose = require("mongoose");
const validator = require("validator");
const jwt =require("jsonwebtoken");

//schema creation 
const registerSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        minLength: [3, "minimun 3 letters required"],
        maxLength: [20, "more than 20 letters not allowed"],
        lowercase: true,
    },
    lname: {
        type: String,
        required: true,
        minLength: [3, "minimun 3 letters required"],
        maxLength: [20, "more than 20 letters not allowed"],
        lowercase: true,
    },
    userType: {
        type: String,
        enum: ['student', 'coordinator'], // Allowed values for dropdown
        required: true
      },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("email is invalid")
            }
        },
        lowercase: true
    },
    mobileno: {
        type: Number,
        required: true,
        min: 1000000000,
        max: 9999999999
    },
    password: {
        type: String,
        required: true
    },
    companyName:{
        type:String,
        required:true
    } ,
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    } 
});

//genetaing token 
registerSchema.methods.generateToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id.toString() }, "mkolpijunhygtbvfredcxswqazsdfghjkloiu");
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    } catch (error) {
        console.log(error)
    }
}

//collection created 
const Register = new mongoose.model("Register", registerSchema);

module.exports = Register;