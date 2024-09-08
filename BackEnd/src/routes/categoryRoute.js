const express = require("express");
const {createCategory, searchAll} = require("../Controllers/categoryController");
const authMiddleware = require("../middleware/authMiddleware");
const { authorizeRole } = require("../middleware/authorizationMiddleware");

const router = express.Router();


/**
 * @description To create category router
 * @api /api/category/create
 * @access Private only admin can change it
 * @type post
 * @return response
 */


router.post("/create",authMiddleware,authorizeRole("admin"),createCategory);

//getting all data
router.get("/all",searchAll)

module.exports = router;
