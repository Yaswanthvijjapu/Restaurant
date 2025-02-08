const  client = require('../db')
async function getRestaurantById(req, res) {
    try {
        const db = client.db("restaurant"); 
        const collection = db.collection("restaurantList"); 
        if (!collection) {
            return res.status(500).json({ message: "NO Database" });
        }
        const { id } = req.params;
        const document = await collection.findOne({ "restaurants.restaurant.id": id });
        if (!document) {
            return res.status(404).json({ message: "Restaurant not found" });
        }
        const restaurant = document.restaurants.find(r => r.restaurant.id == id);
        res.json(restaurant.restaurant);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
module.exports = {  getRestaurantById };