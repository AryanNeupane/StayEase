const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");

const listingController = require('../controllers/listings');

// Index & Create Route
router
  .route("/")
  .get(wrapAsync(listingController.index)) // Index
  .post(isLoggedIn, validateListing, wrapAsync(listingController.createListing)); // Create

// New Listing Form Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Show, Update & Delete Route
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing)) // Show
  .put(isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing)) // Update
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing)); // Delete

// Edit Form Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;
