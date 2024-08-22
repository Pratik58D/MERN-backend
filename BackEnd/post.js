const express = require("express")

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Hello, world!");
});
app.post("/",(req,res)=>{
    res.send("got a post request")
})

app.listen(PORT,()=>console.log("server is started"))