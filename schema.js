/**
 * Joi Validation Schemas
 * 
 * This file defines Joi validation schemas for:
 * - Listing data validation (title, description, price, location, etc.)
 * - Review data validation (rating, comment)
 * 
 * These schemas ensure data integrity and provide consistent validation
 * across the application.
 */

const Joi = require('joi');

/**
 * Listing Validation Schema
 * 
 * Validates all fields required for creating/updating a listing:
 * - title: Required string
 * - description: Required string
 * - image: Optional string with default fallback
 * - price: Required number with minimum value of 0
 * - location: Required string
 * - country: Required string
 */
const listingJoiSchema = Joi.object({
  title: Joi.string().required(), // Title is required
  description: Joi.string().required(), // Description is required
  image: Joi.string().allow('').default(
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ).custom((value, helpers) => {
    // If empty string, replace with default URL (same as your setter in mongoose)
    if (value === '') {
      return "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    }
    return value;
  }),
  price: Joi.number().required().min(0).custom((value, helpers) => {
    // Convert string to number if needed
    if (typeof value === 'string') {
      const num = parseFloat(value);
      if (isNaN(num)) {
        return helpers.error('any.invalid');
      }
      return num;
    }
    return value;
  }),
  location: Joi.string().required(), // Location is required
  country: Joi.string().required() // Country is required
});

/**
 * Review Validation Schema
 * 
 * Validates all fields required for creating a review:
 * - rating: Required number between 1 and 5
 * - comment: Required string
 */
const reviewJoiSchema = Joi.object({
  rating: Joi.number().required().min(1).max(5), // Rating must be 1-5
  comment: Joi.string().required() // Comment is required
});

// Export both schemas
module.exports = { listingJoiSchema, reviewJoiSchema };
