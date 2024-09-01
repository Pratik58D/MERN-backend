const express = require("express");
const {createCategory, searchAll} = require("../Controllers/categoryController");

const router = express.Router();

router.post("/create",createCategory);

//getting all data
router.get("/all",searchAll)

module.exports = router;
