const  client = require('../db')

const getRestaurantByName = async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({ error: "Restaurant name is required" });
        }
        const db = client.db("restaurant"); 
        const collection = db.collection("restaurantList"); 

        // Case-insensitive regex for partial matching
        const regex = new RegExp(name, "i");

        console.log("🔍 Searching for:", name);
        console.log("🔍 Using regex:", regex);

        const document = await collection.aggregate([
            { $unwind: "$restaurants" }, // Convert array to individual objects
            {
                $match: {
                    "restaurants.restaurant.name": regex
                }
            }
        ]).toArray();

        console.log("✅ Found Restaurants:", document);

        res.json({ restaurants: document }); // Send response
    } catch (error) {
        console.error("❌ Error searching restaurants:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { getRestaurantByName }; 