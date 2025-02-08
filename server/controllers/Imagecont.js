const  client = require('../db')
const axios = require("axios");
const multer = require("multer");
const HF_API_KEY = process.env.HF_API_KEY;

const storage = multer.memoryStorage();
const upload = multer({ storage });

const detectFood = async (imageBuffer) => {
    try {
        const response = await axios.post(
            "https://api-inference.huggingface.co/models/ewanlong/food_type_image_detection",
            imageBuffer,
            {
                headers: {
                    Authorization: `Bearer ${HF_API_KEY}`,
                    "Content-Type": "application/octet-stream",
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error from API:", error.response ? error.response.data : error.message);
        return null;
    }
};

const uploadAndFindRestaurants = async (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No image uploaded" });

    try {
        const foodDetectionResult = await detectFood(req.file.buffer);
        
        if (!foodDetectionResult || !Array.isArray(foodDetectionResult) || foodDetectionResult.length === 0) {
            return res.status(500).json({ error: "Food detection failed" });
        }
        
        const foodToCuisineMap = {
            burger: "American",
            pizza: "Italian",
            sushi: "Japanese",
            biryani: "Indian",
            tacos: "Mexican",
            pasta: "Italian",
            cheesecake: "Dessert",
            "baked potato": "American",
            "crispy chicken": "Fast Food",
            chai: "Indian"
        };
        
        const topCuisines = foodDetectionResult
            .sort((a, b) => b.score - a.score)
            .slice(0, 2)
            .map(item => foodToCuisineMap[item.label.toLowerCase()] || null) 
            .filter(Boolean);
        
        if (topCuisines.length === 0) {
            return res.json({ message: "No cuisines identified", restaurants: [] });
        }
        
        console.log("Identified Cuisines:", topCuisines);
        const db = client.db("restaurant"); 
        const collection = db.collection("restaurantList"); 

        const result = await collection
            .find({ "restaurants.restaurant.cuisines": { $in: topCuisines } })
            .toArray();
        
        const filteredRestaurants = result.flatMap(doc =>
            doc.restaurants
                .filter(r => topCuisines.some(c => r.restaurant.cuisines.includes(c)))
                .map(r => ({
                    name: r.restaurant.name,
                    location: r.restaurant.location,
                    cuisines: r.restaurant.cuisines,
                    user_rating: r.restaurant.user_rating,
                    price_range: r.restaurant.price_range,
                    featured_image: r.restaurant.featured_image,
                    menu_url: r.restaurant.menu_url,
                    url: r.restaurant.url
                }))
        );

        if (filteredRestaurants.length === 0) {
            return res.json({ message: "No matching restaurants found", restaurants: [] });
        }

        res.json({ restaurants: filteredRestaurants });
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { uploadAndFindRestaurants, upload };
