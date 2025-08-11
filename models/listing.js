/**
 * Listing Model
 * 
 * This file defines the Mongoose schema for property listings including:
 * - Basic listing information (title, description, price, location)
 * - Image handling with URL and filename
 * - Relationships with User (owner) and Review models
 * - Cascade delete functionality for reviews
 */

const mongoose = require("mongoose");
const review = require("./review");
const Schema = mongoose.Schema;

/**
 * Listing Schema Definition
 * Defines the structure and validation for property listings
 */
const listingSchema = new Schema({
    title: String, // Property title
    description: String, // Property description
    image: {
        url: String, // Image URL for display
        filename: String, // Original filename for reference
    },
    price: Number, // Price per night
    location: String, // Property location
    country: String, // Property country
    reviews: [{
        type: Schema.Types.ObjectId, // Reference to Review documents
        ref: "Review", // Model name for population
    }],
    owner: {
        type: Schema.Types.ObjectId, // Reference to User document
        ref: "User", // Model name for population
    }
});

/**
 * Post Middleware - Cascade Delete Reviews
 * 
 * This middleware runs after a listing is deleted and removes all associated reviews
 * This ensures data consistency and prevents orphaned review documents
 */
listingSchema.post("findOneAndDelete", async(listing) => {
    if (listing) {
        // Delete all reviews that were associated with this listing
        await review.deleteMany({
            _id: {
                $in: listing.reviews, // Find reviews whose IDs are in the listing's reviews array
            },
        });
    }
});

// Create and export the Listing model
const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing; 
