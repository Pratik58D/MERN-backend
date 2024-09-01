//routes for user registaration

const express = require("express");
const { resgisterUser, getUsers,loginUser } = require("../Controllers/userControllers");

const router = express.Router();

router.post("/registration",resgisterUser);

router.post("/login",loginUser);


//for finding the users
router.get("/users",getUsers)





module.exports = router;