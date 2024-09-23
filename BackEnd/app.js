const express = require("express");
const cors = require("cors");
const connectDb = require("./src/config/db");
const userRegister = require("./src/routes/userRoutes");
const showprofile = require("./src/routes/profileRoute");
const createCategory = require("./src/routes/categoryRoute");
const createProduct = require("./src/routes/productRoutes");

const app = express();
const dotenv = require("dotenv");
const path = require("path"); 
dotenv.config();
const PORT = process.env.PORT || 3000;

//database

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
console.log(connectDb());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//userregister

app.use("/api/user", userRegister);

//profileregister
app.use("/api/profile", showprofile);

//for category

//create category
app.use("/api/category", createCategory);

//for Product
app.use("/api/product", createProduct);

app.listen(PORT, () => console.log(`server started ${PORT} `));
