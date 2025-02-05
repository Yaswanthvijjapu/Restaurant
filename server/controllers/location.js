const client = require("../db"); 

const getRestaurantsByLocation = async (req, res) => {
    try {
        const db = client.db("restaurant"); 
        const collection = db.collection("restaurantList"); 
        
        const { lat, lng, radius } = req.query;
        if (!lat || !lng || !radius) {
            return res.status(400).json({ message: "Latitude, longitude, and radius are required." });
        }

        const latitude = parseFloat(lat);
        const longitude = parseFloat(lng);
        const searchRadius = parseFloat(radius) / 6378.1;

        if (isNaN(latitude) || isNaN(longitude) || isNaN(searchRadius)) {
            return res.status(400).json({ message: "Invalid latitude, longitude, or radius." });
        }

        const restaurants = await collection.aggregate([
            { $unwind: "$restaurants" },
            {
                $addFields: {
                    "restaurants.restaurant.location.coordinates": {
                        $map: {
                            input: ["$restaurants.restaurant.location.longitude", "$restaurants.restaurant.location.latitude"],
                            as: "coord",
                            in: { $toDouble: "$$coord" }
                        }
                    }
                }
            },
            {
                $match: {
                    "restaurants.restaurant.location.coordinates": {
                        $geoWithin: {
                            $centerSphere: [[longitude, latitude], searchRadius]
                        }
                    }
                }
            },
            { $replaceRoot: { newRoot: "$restaurants" } }
        ]).toArray();

        res.json(restaurants);
    } catch (error) {
        console.error("Error in location search:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { getRestaurantsByLocation };
