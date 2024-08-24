//routes for user registaration

const express = require("express");
const { resgisterUser } = require("../Controllers/userControllers");

const router = express.Router();

router.post("/registration",resgisterUser);

module.exports = router;