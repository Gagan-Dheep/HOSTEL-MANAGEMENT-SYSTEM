const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017'; // MongoDB URL
const dbName = 'internship'; // Database name

let db = null;

async function connectToMongoDB() {
    if (db) {
        return db;
    }
    const client = new MongoClient(url);
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db(dbName); 
    return db;
}

module.exports = connectToMongoDB;
