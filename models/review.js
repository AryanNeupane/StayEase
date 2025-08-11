/**
 * Review Model
 * 
 * This file defines the Mongoose schema for reviews including:
 * - Review content (comment and rating)
 * - Author relationship with User model
 * - Timestamp for review creation
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Review Schema Definition
 * Defines the structure and validation for user reviews
 */
const reviewSchema = new Schema({
    comment: String, // Review text content
    rating: {
        type: Number,
        min: 1, // Minimum rating value
        max: 5  // Maximum rating value
    },
    createdAt: {
        type: Date,
        default: Date.now() // Automatically set to current date/time
    },
    author: {
        type: Schema.Types.ObjectId, // Reference to User document
        ref: 'User' // Model name for population
    }
});

// Create and export the Review model
module.exports = mongoose.model('Review', reviewSchema);