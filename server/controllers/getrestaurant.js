const  client  = require('../db')

const getRestaurantById= async (req, res) => {
    try {
      const db = client.db("restaurant"); // Your database name
      const collection = db.collection("restaurantList"); // Your collection name
  
      const restaurantId = req.params.id; // Keep it as a string
  
      // Query to find the restaurant inside the "restaurants" array
      const restaurantData = await collection.findOne(
        { "restaurants.restaurant.id": restaurantId }, 
        { projection: { "restaurants": { $elemMatch: { "restaurant.id": restaurantId } } } } // Use $elemMatch to filter the matching restaurant
      );
  
      if (!restaurantData) {
        return res.status(404).json({ error: "Restaurant not found" });
      }
  
      res.json(restaurantData.restaurants[0]); // Extract the restaurant object
    } catch (error) {
      console.error("Error fetching restaurant:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  module.exports = getRestaurantById;