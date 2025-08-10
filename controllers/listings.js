const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");

// Index Route
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

// New Listing Form Route
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

// Show Route with reviews populated
module.exports.showListing = async (req, res) => {
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
};

// Create Route
module.exports.createListing = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);
    console.log('User:', req.user);
    
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    
    // Handle uploaded image
    if (req.file) {
      newListing.image = {
        url: `/uploads/${req.file.filename}`,
        filename: req.file.filename
      };
    }
    
    console.log('New listing object:', newListing);
    
    await newListing.save();
    req.flash("success", "Successfully created a new listing!");
    res.redirect("/listings");
  } catch (error) {
    console.error('Error creating listing:', error);
    throw error;
  }
};

// Edit Form Route
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    throw new ExpressError(404, "Listing Not Found");
  }
  res.render("listings/edit.ejs", { listing });
};

// Update Listing Route
module.exports.updateListing = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body.listing };
    
    // Handle uploaded image
    if (req.file) {
      updateData.image = {
        url: `/uploads/${req.file.filename}`,
        filename: req.file.filename
      };
    }
    
    const updatedListing = await Listing.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedListing) {
      throw new ExpressError(404, "Listing Not Found");
    }
    req.flash("success", "Listing updated!");
    res.redirect(`/listings/${id}`);
  } catch (error) {
    console.error('Error updating listing:', error);
    throw error;
  }
};

// Delete Route
module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);
  if (!deletedListing) {
    throw new ExpressError(404, "Listing Not Found");
  }
  req.flash("success", "Deleted listing!");
  res.redirect("/listings");
};
