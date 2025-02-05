const express = require("express");
const router = express.Router();

const getRestaurantById = require('../controllers/getrestaurant');
const allrestaurants = require('../controllers/restaurantlist');


router.get("/:id", getRestaurantById);
router.get("/", allrestaurants);

module.exports = router;
