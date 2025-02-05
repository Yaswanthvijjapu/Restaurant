const { MongoClient } = require('mongodb');
const { readFileSync } = require('fs');

const uri = "mongodb+srv://yaswanthvijjapu799:yash123456@cluster0.dndd0.mongodb.net/restaurant"; 
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function uploadData() {
    try {
        await client.connect();

        const database = client.db('restaurant'); 
        const collection = database.collection('restaurantList'); 

        const data = JSON.parse(readFileSync('./file5.json', 'utf8')); 

        const result = await collection.insertMany(data);
        console.log(`${result.insertedCount} documents were inserted.`);
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.close();
    }
}

uploadData();