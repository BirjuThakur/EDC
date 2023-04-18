const express = require("express");
const app = express();
const port = process.env.port || 5000 ;

//router connection 
app.use(require("./router/router"));


app.get("/" , (req,res) =>{
    res.send("hello react")
})

app.listen(port,()=>{
    console.log("running on port 5000")
})