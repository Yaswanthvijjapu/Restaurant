const  client  = require('../db')

const getRestaurantById= async (req, res) => {
    try {
      const db = client.db("restaurant"); 
      const collection = db.collection("restaurantList"); 
  
      const restaurantId = req.params.id; 
  
      const restaurantData = await collection.findOne(
        { "restaurants.restaurant.id": restaurantId }, 
        { projection: { "restaurants": { $elemMatch: { "restaurant.id": restaurantId } } } } 
      );
  
      if (!restaurantData) {
        return res.status(404).json({ error: "Restaurant not found" });
      }
  
      res.json(restaurantData.restaurants[0]); 
    } catch (error) {
      console.error("Error fetching restaurant:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  module.exports = getRestaurantById;