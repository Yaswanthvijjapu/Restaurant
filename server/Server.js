require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const restaurantroutes = require("./routes/Restaurantroutes"); 
const getRestaurantsByLocation=require("./routes/LocationRoute")
const getRestaurantById = require("./routes/searchRoute")
const imgsearch = require("./routes/imageRoute")
const getRestaurantByName=require("./routes/nameRoute")


app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/restaurants",getRestaurantsByLocation)
app.use("/api/restaurants", restaurantroutes);
app.use("/restaurants",getRestaurantById)
app.use("/restaurants",imgsearch)
app.use("/restaurants",getRestaurantByName);



app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});




