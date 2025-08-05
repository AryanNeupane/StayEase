const express = require('express');
const router = express.Router({ mergeParams: true }); // Important for nested routes
const Listing = require('../models/listing');
const Review = require('../models/review');
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError');
const {  validateReview, isLoggedIn, isOwner, isReviewAuthor } = require('../middleware');



// ✅ POST Review
router.post(
  '/',
  isLoggedIn,
  validateReview,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    const newReview = new Review(req.body.review);
    newReview.author = req.user._id; // Set the author to the logged-in user
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "Review Done");

    res.redirect(`/listings/${id}`);
  })
);

// ✅ DELETE Review
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
    wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    // Delete the review from the database
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted !");
    res.redirect(`/listings/${id}`);
  })
);

module.exports = router;
