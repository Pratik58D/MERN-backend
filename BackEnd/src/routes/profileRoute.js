const express = require('express');
const router = express.Router();

const { getProfiles, UpdateProfile, deleteProfile } = require('../Controllers/profileController');
const authMiddleware = require('../middleware/authMiddleware');


/**
 * @description To update a user Profile
 * @api /api/profile/update
 * @access Private
 * @type put
 * @return response
 */


router.put("/update",authMiddleware, UpdateProfile)


/**
 * @description To update a user Profile
 * @api /api/profile/update
 * @access Private
 * @type put
 * @return response
 */

//new route to get all profiles
router.get("/get",authMiddleware,getProfiles);

/**
 * @description delete a user Profile
 * @api /api/profile/delete
 * @access Private
 * @type delete
 * @return response
 */
router.delete("/delete",authMiddleware,deleteProfile);


module.exports = router;
