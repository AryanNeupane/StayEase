const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");

const Listing = require("../models/listing");
const { isLoggedIn, isOwner, validateListing } = require("../middleware"); // Import the middleware





// Index Route - list all listings
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  })
);

// New Route - form to create new listing
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new.ejs");
});

// Show Route - show one listing by id
// Show Route - show one listing by id WITH reviews populated
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id)
      .populate({
        path: 'reviews',
        populate: { path: 'author' }
      })
      .populate('owner');

    if (!listing) {
      req.flash("error", "Listing does not exist!");
      return res.redirect("/listings");
    }

    res.render("listings/show.ejs", { listing });
  })
);




// Create Route - save new listing
router.post(
  "/", validateListing,
  wrapAsync(async (req, res) => {

    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id; // Set the owner to the logged-in user
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
  "/:id", isLoggedIn, isOwner, validateListing,
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
