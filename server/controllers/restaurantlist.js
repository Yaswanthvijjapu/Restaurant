const  client = require('../db')

const allrestaurants = async (req, res) => {
    try {
      const db = client.db("restaurant"); 
      const collection = db.collection("restaurantList"); 
  
      const page = parseInt(req.query.page) || 1; 
      const limit = parseInt(req.query.limit) || 10; 
  
      const skip = (page - 1) * limit;
  
      const restaurants = await collection
        .aggregate([
          { $unwind: "$restaurants" }, 
          { $skip: skip },
          { $limit: limit }
        ])
        .toArray();
  
      const totalRestaurants = await collection
        .aggregate([{ $unwind: "$restaurants" }, { $count: "total" }])
        .toArray();
  
      const total = totalRestaurants.length ? totalRestaurants[0].total : 0;
      const totalPages = Math.ceil(total / limit);
  
      res.json({
        page,
        limit,
        total,
        totalPages,
        restaurants: restaurants.map(r => r.restaurants) 
      });
    } catch (error) {
      console.error("Error fetching restaurants:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  module.exports = allrestaurants;


