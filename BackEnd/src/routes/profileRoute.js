const express = require('express');
const router = express.Router();

const { getProfiles } = require('../Controllers/profileController');

;

//new route to get all profiles
router.get("/all",getProfiles);



module.exports = router;
