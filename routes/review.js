const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapAsync');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');
const reviewController = require('../controllers/reviews');

// Create Review
router
  .route('/')
  .post(
    isLoggedIn,
    validateReview,
    wrapAsync(reviewController.createReview)
  );

// Delete Review
router
  .route('/:reviewId')
  .delete(
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.deleteReview)
  );

module.exports = router;
