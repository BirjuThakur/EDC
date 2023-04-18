const mongoose = require("mongoose");

//database connection
mongoose.connect("mongodb+srv://birjusinghthakur:birjusinghthakur@cluster0.r3pdtgp.mongodb.net/EDC?retryWrites=true&w=majority").then(()=>{console.log("connection successfully")})
.catch(()=>{console.log("connection dismiss")});

// "mongodb+srv://birjusingh:birjusingh@cluster0.r3pdtgp.mongodb.net/EDC"
// "mongodb://localhost:27017/EDC"