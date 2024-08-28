//routes for user registaration

const express = require("express");
const { resgisterUser, getUsers } = require("../Controllers/userControllers");

const router = express.Router();

router.post("/registration",resgisterUser);

//for finding the users
router.get("/users",getUsers)

module.exports = router;