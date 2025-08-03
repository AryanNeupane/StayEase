const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");  
const {listingJoiSchema} = require("../schema");
const review = require("../models/review");
const Listing = require("../models/listing");
const { isLoggedIn } = require("../middleware"); // Import the middleware



const validateListing = (req, res, next) => {
  const { error } = listingJoiSchema.validate(req.body.listing);  // validate req.body.listing, not entire req.body
  if (error) {
    throw new ExpressError(400, error.details.map(d => d.message).join(', '));
  } else {
    next();
  }
}


// Index Route - list all listings
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  })
);

// New Route - form to create new listing
router.get("/new",isLoggedIn, (req, res) => {

  res.render("listings/new.ejs");
});

// Show Route - show one listing by id
// Show Route - show one listing by id WITH reviews populated
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate('reviews'); // <-- populate reviews here
    if (!listing) {
      req.flash("error", " listing doesnot exist. !");
      return res.redirect("/listings");
    }
    res.render("listings/show.ejs", { listing });
  })
);


// Create Route - save new listing
router.post(
  "/",validateListing,
  wrapAsync(async (req, res) => {
   
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success", "Successfully created a new listing!");
    res.redirect("/listings");
  })
);

// Edit Route - form to edit listing
router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      throw new ExpressError(404, "Listing Not Found");
    }
    res.render("listings/edit.ejs", { listing });
  })
);

// Update Route - update listing in DB
router.put(
  "/:id",validateListing,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const updatedListing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });
    if (!updatedListing) {
      throw new ExpressError(404, "Listing Not Found");
    }
    req.flash("success", " listing updated !");

    res.redirect(`/listings/${id}`);
  })
);

// Delete Route - delete listing
router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    if (!deletedListing) {
      throw new ExpressError(404, "Listing Not Found");
    }
    req.flash("success", "Deleted listing !");

    res.redirect("/listings");
  })
);


module.exports = router;
