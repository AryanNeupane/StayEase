const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");

const listingController = require('../controllers/listings');
const multer = require('multer');
const path = require('path');

// Use local storage instead of Cloudinary for now
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    console.log('Multer fileFilter - file:', file);
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Index & Create Route
router.route('/')
   .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    (req, res, next) => {
      upload.single('listing[image]')(req, res, (err) => {
        if (err) {
          console.error('Multer error:', err);
          return res.status(400).send(`File upload error: ${err.message}`);
        }
        next();
      });
    },
    // validateListing,
    wrapAsync(listingController.createListing)
  );

// New Listing Form Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Show, Update & Delete Route
router
  .route("/:id")
  .get(wrapAsync(listingController.showListing)) // Show
  .put(
    isLoggedIn, 
    isOwner, 
    (req, res, next) => {
      upload.single('listing[image]')(req, res, (err) => {
        if (err) {
          console.error('Multer error:', err);
          return res.status(400).send(`File upload error: ${err.message}`);
        }
        next();
      });
    },
    validateListing, 
    wrapAsync(listingController.updateListing)
  ) // Update
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing)); // Delete

// Edit Form Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;
