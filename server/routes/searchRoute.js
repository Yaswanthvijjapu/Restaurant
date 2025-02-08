const express = require("express");
const { getRestaurantById } = require("../controllers/search");

const router = express.Router();

router.get("/:id", getRestaurantById);

module.exports = router;