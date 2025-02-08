const express = require("express");
const { uploadAndFindRestaurants, upload } = require("../controllers/Imagecont");

const router = express.Router();

// Single route to handle image upload, food detection, cuisine identification, and restaurant search
router.post("/imgsearch", upload.single("image"), uploadAndFindRestaurants);

module.exports = router;