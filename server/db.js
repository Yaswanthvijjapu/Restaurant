const { MongoClient } = require("mongodb");
require("dotenv").config(); 

const uri = process.env.MONGODB_URI; 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
  }
}

connectDB();

module.exports = client; 
