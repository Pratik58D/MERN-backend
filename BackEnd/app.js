const express = require("express");
const app = express();
const dotenv = require("dotenv")
dotenv.config();
const PORT = process.env.PORT || 3000; 

const connectDb = require("./src/config/db");
app.use(express.json())

console.log(connectDb())
const userRegister = require("./src/routes/userRoutes");

app.use("/api/user",userRegister)

app.listen(PORT,()=>console.log(`server started ${PORT} `))