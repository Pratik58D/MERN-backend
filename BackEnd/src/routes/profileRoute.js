const express = require('express');
const { showProfile ,getProfiles,getProfileById } = require('../Controllers/profileController');

const router = express.Router();

router.post("/profile",showProfile);

//new route to get all profiles
router.get("/profiles",getProfiles);

// Route to get a profile by ID
router.get("/profile/:id", getProfileById);


module.exports = router;
