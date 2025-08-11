/**
 * Listing Controller
 * 
 * This file contains all the business logic for listing operations including:
 * - CRUD operations (Create, Read, Update, Delete)
 * - File upload handling
 * - Database operations with Mongoose
 */

const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");

/**
 * Index Route - Display all listings
 * GET /listings
 * 
 * Retrieves all listings from the database and renders the index page
 */
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({}); // Get all listings from database
  res.render("listings/index.ejs", { allListings }); // Render index page with listings
};

/**
 * New Listing Form Route - Display form to create new listing
 * GET /listings/new
 * 
 * Renders the form page for creating a new listing
 */
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs"); // Render new listing form
};

/**
 * Show Route - Display specific listing with reviews
 * GET /listings/:id
 * 
 * Retrieves a specific listing by ID, populates its reviews and owner information,
 * then renders the show page
 */
module.exports.showListing = async (req, res) => {
  const { id } = req.params; // Get listing ID from URL parameters
  
  // Find listing and populate related data
  const listing = await Listing.findById(id)
    .populate({
      path: 'reviews', // Populate reviews array
      populate: { path: 'author' } // Also populate review authors
    })
    .populate('owner'); // Populate listing owner

  // Check if listing exists
  if (!listing) {
    req.flash("error", "Listing does not exist!");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing }); // Render show page with listing data
};

/**
 * Create Route - Create new listing
 * POST /listings
 * 
 * Creates a new listing with uploaded image and saves it to the database
 */
module.exports.createListing = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);
    console.log('User:', req.user);
    
    // Create new listing from form data
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id; // Set the current user as owner
    
    // Handle uploaded image if present
    if (req.file) {
      newListing.image = {
        url: `/uploads/${req.file.filename}`, // Set image URL for serving
        filename: req.file.filename // Store filename for reference
      };
    }
    
    console.log('New listing object:', newListing);
    
    await newListing.save(); // Save listing to database
    req.flash("success", "Successfully created a new listing!");
    res.redirect("/listings"); // Redirect to listings index
  } catch (error) {
    console.error('Error creating listing:', error);
    throw error; // Let error handler deal with it
  }
};

/**
 * Edit Form Route - Display form to edit listing
 * GET /listings/:id/edit
 * 
 * Retrieves a listing and renders the edit form
 */
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params; // Get listing ID from URL parameters
  const listing = await Listing.findById(id); // Find listing by ID
  
  // Check if listing exists
  if (!listing) {
    throw new ExpressError(404, "Listing Not Found");
  }
  
  res.render("listings/edit.ejs", { listing }); // Render edit form with listing data
};

/**
 * Update Route - Update existing listing
 * PUT /listings/:id
 * 
 * Updates a listing with new data and handles image upload
 */
module.exports.updateListing = async (req, res) => {
  try {
    const { id } = req.params; // Get listing ID from URL parameters
    const updateData = { ...req.body.listing }; // Get updated data from form
    
    // Handle uploaded image if present
    if (req.file) {
      updateData.image = {
        url: `/uploads/${req.file.filename}`, // Set new image URL
        filename: req.file.filename // Store new filename
      };
    }
    
    // Update listing in database
    const updatedListing = await Listing.findByIdAndUpdate(id, updateData, { new: true });
    
    // Check if listing exists
    if (!updatedListing) {
      throw new ExpressError(404, "Listing Not Found");
    }
    
    req.flash("success", "Listing updated!");
    res.redirect(`/listings/${id}`); // Redirect to updated listing
  } catch (error) {
    console.error('Error updating listing:', error);
    throw error; // Let error handler deal with it
  }
};

/**
 * Delete Route - Delete listing
 * DELETE /listings/:id
 * 
 * Deletes a listing from the database
 */
module.exports.deleteListing = async (req, res) => {
  const { id } = req.params; // Get listing ID from URL parameters
  const deletedListing = await Listing.findByIdAndDelete(id); // Delete listing
  
  // Check if listing existed
  if (!deletedListing) {
    throw new ExpressError(404, "Listing Not Found");
  }
  
  req.flash("success", "Deleted listing!");
  res.redirect("/listings"); // Redirect to listings index
};
