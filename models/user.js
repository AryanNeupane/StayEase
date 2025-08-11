/**
 * User Model
 * 
 * This file defines the Mongoose schema for users including:
 * - User authentication fields (email, username, password)
 * - Passport.js integration for password hashing and authentication
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Import Passport-Local-Mongoose for authentication functionality
const passportLocalMongoose = require('passport-local-mongoose');

/**
 * User Schema Definition
 * Defines the structure and validation for user accounts
 */
const userSchema = new Schema({
    email: {
        type: String,
        required: true, // Email is required
        unique: true,   // Email must be unique across all users
    }   
});

/**
 * Passport-Local-Mongoose Plugin
 * 
 * This plugin automatically adds:
 * - username field (required, unique)
 * - password field (hashed automatically)
 * - Authentication methods (authenticate, register, etc.)
 * - Password hashing and salting
 * - Session serialization/deserialization methods
 */
userSchema.plugin(passportLocalMongoose);

// Create and export the User model
module.exports = mongoose.model('User', userSchema);