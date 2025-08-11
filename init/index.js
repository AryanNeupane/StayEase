/**
 * Database Initialization Script
 * 
 * This script initializes the database with sample data for development/testing.
 * It connects to MongoDB and populates the database with sample listings.
 * 
 * Usage: node init/index.js
 */

const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");

// MongoDB connection URL (local development)
const MONGO_URL = 'mongodb://127.0.0.1:27017/StayEase'

/**
 * Connect to MongoDB
 * Establishes connection to the local MongoDB instance
 */
async function main() {
  await mongoose.connect(MONGO_URL);
}

// Execute database connection
main().then(() => {
  console.log("Database Connected")
}).catch((err) => {
  console.log(err)
})

/**
 * Initialize Database with Sample Data
 * 
 * This function:
 * 1. Deletes all existing listings
 * 2. Adds sample listings with a default owner
 * 3. Logs the initialization process
 */
const initDB = async () => {
  // Clear all existing listings
  await Listing.deleteMany({})
  
  // Add default owner ID to all sample listings
  initData.data = initData.data.map((item) => ({...item, owner: '688e3d0ddb6071c57d53dd7d'}))
  
  // Insert all sample listings into database
  await Listing.insertMany(initData.data)
  
  console.log("Database initialized with sample data")
  console.log(initData.data)
}

// Execute database initialization
initDB();