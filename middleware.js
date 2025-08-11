/**
 * Middleware Functions
 * 
 * This file contains all custom middleware functions for:
 * - Authentication and authorization
 * - Data validation
 * - Session management
 * - Error handling
 */

const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError");
const listingJoiSchema = require("./schema").listingJoiSchema;
const reviewJoiSchema = require("./schema").reviewJoiSchema;

/**
 * Authentication Middleware - Check if user is logged in
 * 
 * This middleware checks if the user is authenticated using Passport.js
 * If not authenticated, it saves the current URL and redirects to login
 */
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl; // Save current URL for post-login redirect
    req.flash("error", "You must be signed in first!");
    return res.redirect("/login");
  }
  next(); // Continue to next middleware/route handler
};

/**
 * Session Middleware - Save redirect URL
 * 
 * This middleware saves the redirect URL from session to res.locals
 * This allows the login controller to access the saved URL
 */
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirect = req.session.redirectUrl;
  }
  next();
};

/**
 * Authorization Middleware - Check if user owns the listing
 * 
 * This middleware verifies that the current user is the owner of the listing
 * Only listing owners can edit or delete their listings
 */
module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params; // Get listing ID from URL parameters
  const listing = await Listing.findById(id); // Find the listing

  // Check if listing exists
  if (!listing) {
    throw new ExpressError(404, "Listing Not Found");
  }

  // Check if the current user is the owner of the listing
  if (!res.locals.currentUser || !listing.owner.equals(res.locals.currentUser._id)) {
    req.flash("error", "You are not the owner of this listing!");
    return res.redirect(`/listings/${id}`);
  }
  next(); // Continue to next middleware/route handler
}

/**
 * Validation Middleware - Validate listing data
 * 
 * This middleware validates listing data using Joi schema
 * Ensures all required fields are present and valid
 */
module.exports.validateListing = (req, res, next) => {
  try {
    console.log('Validation middleware - req.body:', req.body);
    console.log('Validation middleware - req.file:', req.file);
    
    // Create a copy of the listing data for validation
    const listingData = { ...req.body.listing };
    
    // If a file was uploaded, add the file path to the listing data
    if (req.file) {
      listingData.image = req.file.path;
    }
    
    console.log('Validation middleware - listingData:', listingData);
    
    // Validate the listing data against the Joi schema
    const { error } = listingJoiSchema.validate(listingData);
    if (error) {
      console.log('Validation error:', error.details);
      throw new ExpressError(400, error.details.map(d => d.message).join(', '));
    } else {
      console.log('Validation passed');
      next(); // Continue to next middleware/route handler
    }
  } catch (error) {
    console.error('Error in validateListing middleware:', error);
    throw error;
  }
}

/**
 * Validation Middleware - Validate review data
 * 
 * This middleware validates review data using Joi schema
 * Ensures rating and comment are present and valid
 */
module.exports.validateReview = (req, res, next) => {
  const { error } = reviewJoiSchema.validate(req.body.review);
  if (error) {
    throw new ExpressError(400, error.details.map(d => d.message).join(', '));
  } else {
    next(); // Continue to next middleware/route handler
  }
};

/**
 * Authorization Middleware - Check if user is review author
 * 
 * This middleware verifies that the current user is the author of the review
 * Only review authors can delete their own reviews
 */
module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params; // Get listing and review IDs from URL parameters
  const review = await Review.findById(reviewId); // Find the review

  // Check if review exists
  if (!review) {
    req.flash("error", "Review not found.");
    return res.redirect(`/listings/${id}`);
  }

  // Check if the current user is the author of the review
  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/listings/${id}`);
  }

  next(); // Continue to next middleware/route handler
};