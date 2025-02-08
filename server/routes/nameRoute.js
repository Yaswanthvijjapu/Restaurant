const express = require("express");
const router = express.Router();
const { getRestaurantByName } = require("../controllers/namesearch"); 

router.get("/", getRestaurantByName);

module.exports = router;
