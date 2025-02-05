const express = require("express");
const router = express.Router();
const {getRestaurantsByLocation}= require("../controllers/location")

router.get("/location",getRestaurantsByLocation);
module.exports=router;