const express = require("express");
const app = express();
const PORT = 3000;

const connectDb = require("./src/config/db")

console.log(connectDb())

app.listen(PORT,()=>console.log("server started"))