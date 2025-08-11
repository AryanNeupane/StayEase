/**
 * Review Controller
 * 
 * This file contains all the business logic for review operations including:
 * - Creating new reviews for listings
 * - Deleting reviews
 * - Database operations with Mongoose
 */

const Listing = require('../models/listing');
const Review = require('../models/review');

/**
 * Create Review - Add new review to a listing
 * POST /listings/:id/reviews
 * 
 * Creates a new review and associates it with a listing
 */
module.exports.createReview = async (req, res) => {
  const { id } = req.params; // Get listing ID from URL parameters
  
  // Find the listing to add the review to
  const listing = await Listing.findById(id);
  
  // Create new review from form data
  const newReview = new Review(req.body.review);
  newReview.author = req.user._id; // Set the current user as review author
  
  // Add review to listing's reviews array
  listing.reviews.push(newReview);
  
  // Save both the review and the updated listing
  await newReview.save();
  await listing.save();
  
  req.flash("success", "Review Done");
  res.redirect(`/listings/${id}`); // Redirect back to the listing
};

/**
 * Delete Review - Remove review from a listing
 * DELETE /listings/:id/reviews/:reviewId
 * 
 * Removes a review from both the listing and the database
 */
module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params; // Get listing and review IDs from URL parameters
  
  // Remove review from listing's reviews array
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  
  // Delete the review from the database
  await Review.findByIdAndDelete(reviewId);
  
  req.flash("success", "Review Deleted!");
  res.redirect(`/listings/${id}`); // Redirect back to the listing
};
