/**
 * Review Routes
 * 
 * This file defines all routes related to reviews including:
 * - Creating new reviews for listings
 * - Deleting reviews (only by review authors)
 * - Authorization middleware for review operations
 */

const express = require('express');
const router = express.Router({ mergeParams: true }); // Enable access to parent route params
const wrapAsync = require('../utils/wrapAsync');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const reviewController = require('../controllers/reviews');

/**
 * Create Review Route
 * POST /listings/:id/reviews - Create a new review for a listing
 * 
 * Middleware chain:
 * 1. isLoggedIn - Ensures user is authenticated
 * 2. validateReview - Validates review data (rating, comment)
 * 3. wrapAsync - Handles async errors
 * 4. createReview - Creates the review in database
 */
router
  .route('/')
  .post(
    isLoggedIn, // Require user to be logged in
    validateReview, // Validate review data
    wrapAsync(reviewController.createReview) // Create the review
  );

/**
 * Delete Review Route
 * DELETE /listings/:id/reviews/:reviewId - Delete a specific review
 * 
 * Middleware chain:
 * 1. isLoggedIn - Ensures user is authenticated
 * 2. isReviewAuthor - Ensures user is the author of the review
 * 3. wrapAsync - Handles async errors
 * 4. deleteReview - Removes the review from database
 */
router
  .route('/:reviewId')
  .delete(
    isLoggedIn, // Require user to be logged in
    isReviewAuthor, // Require user to be the review author
    wrapAsync(reviewController.deleteReview) // Delete the review
  );

module.exports = router;
