/**
 * Listing Routes
 * 
 * This file defines all routes related to property listings including:
 * - CRUD operations (Create, Read, Update, Delete)
 * - File upload handling for listing images
 * - Authorization middleware for listing owners
 */

const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");

const listingController = require('../controllers/listings');
const multer = require('multer');
const path = require('path');

/**
 * Configure Multer for file uploads
 * Currently using local storage instead of Cloudinary for simplicity
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Store files in uploads directory
  },
  filename: function (req, file, cb) {
    // Generate unique filename using timestamp and original extension
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

// Configure multer with storage, file filtering, and size limits
const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    console.log('Multer fileFilter - file:', file);
    // Only allow image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB file size limit
  }
});

/**
 * Index & Create Route
 * GET /listings - Display all listings
 * POST /listings - Create a new listing
 */
router.route('/')
   .get(wrapAsync(listingController.index)) // Display all listings
  .post(
    isLoggedIn, // Require user to be logged in
    (req, res, next) => {
      // Handle file upload for listing image
      upload.single('listing[image]')(req, res, (err) => {
        if (err) {
          console.error('Multer error:', err);
          return res.status(400).send(`File upload error: ${err.message}`);
        }
        next();
      });
    },
    // validateListing, // Currently disabled - uncomment to enable validation
    wrapAsync(listingController.createListing) // Create the listing
  );

/**
 * New Listing Form Route
 * GET /listings/new - Display form to create new listing
 */
router.get("/new", isLoggedIn, listingController.renderNewForm);

/**
 * Show, Update & Delete Route
 * GET /listings/:id - Display specific listing
 * PUT /listings/:id - Update listing
 * DELETE /listings/:id - Delete listing
 */
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing)) // Show specific listing
  .put(
    isLoggedIn, // Require user to be logged in
    isOwner, // Require user to be the listing owner
    (req, res, next) => {
      // Handle file upload for listing image update
      upload.single('listing[image]')(req, res, (err) => {
        if (err) {
          console.error('Multer error:', err);
          return res.status(400).send(`File upload error: ${err.message}`);
        }
        next();
      });
    },
    validateListing, // Validate listing data
    wrapAsync(listingController.updateListing) // Update the listing
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing)); // Delete listing

/**
 * Edit Form Route
 * GET /listings/:id/edit - Display form to edit listing
 */
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;
