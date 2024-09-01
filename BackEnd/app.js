const express = require("express");
const app = express();
const dotenv = require("dotenv")
dotenv.config();
const PORT = process.env.PORT || 3000; 

const connectDb = require("./src/config/db");
app.use(express.json())

console.log(connectDb())
//userregister
const userRegister = require("./src/routes/userRoutes");

app.use("/api/user",userRegister);

//profileregister
const showprofile = require("./src/routes/profileRoute")
app.use("/api/profile",showprofile)


//for category 

//create category
const createCategory = require("./src/routes/categoryRoute");
app.use("/api/category",createCategory)



//for Product 
const createProduct = require("./src/routes/productRoutes")
app.use("/api/product",createProduct)


app.listen(PORT,()=>console.log(`server started ${PORT} `))