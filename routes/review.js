const express = require('express');
const router = express.Router({ mergeParams: true }); // Important for nested routes
const Listing = require('../models/listing');
const Review = require('../models/review');
const wrapAsync = require('../utils/wrapAsync');
const ExpressError = require('../utils/ExpressError');
const { reviewJoiSchema } = require('../schema');

const validateReview = (req, res, next) => {
  const { error } = reviewJoiSchema.validate(req.body.review);
  if (error) {
    throw new ExpressError(400, error.details.map(d => d.message).join(', '));
  } else {
    next();
  }
};

// ✅ POST Review
router.post(
  '/',
  validateReview,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    const newReview = new Review(req.body.review);
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
  wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      throw new ExpressError(404, "Listing not found");
    }

    listing.reviews = listing.reviews.filter(
      (review) => review._id.toString() !== reviewId
    );
    await listing.save();
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review Deleted !");
    res.redirect(`/listings/${id}`);
  })
);

module.exports = router;
