require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const restaurantroutes = require("./routes/Restaurantroutes"); 
const getRestaurantsByLocation=require("./routes/LocationRoute")

const db = require('./db')
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/restaurants",getRestaurantsByLocation)
app.use("/api/restaurants", restaurantroutes);




app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});




