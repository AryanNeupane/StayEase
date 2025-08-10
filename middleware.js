const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError");
const listingJoiSchema = require("./schema").listingJoiSchema;
const reviewJoiSchema = require("./schema").reviewJoiSchema;



module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be signed in first!");
    return res.redirect("/login");
  }
  next();
};


module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirect = req.session.redirectUrl;
  }
  next();
};


module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    throw new ExpressError(404, "Listing Not Found");
  }

  // Check if the current user is the owner
  if (!res.locals.currentUser || !listing.owner.equals(res.locals.currentUser._id)) {
    req.flash("error", "You are not the owner of this listing!");
    return res.redirect(`/listings/${id}`);
  }
  next();
}

module.exports.validateListing = (req, res, next) => {
  try {
    console.log('Validation middleware - req.body:', req.body);
    console.log('Validation middleware - req.file:', req.file);
    
    // Create a copy of the listing data for validation
    const listingData = { ...req.body.listing };
    
    // If a file was uploaded, add the file path to the listing data
    if (req.file) {
      listingData.image = req.file.path;
    }
    
    console.log('Validation middleware - listingData:', listingData);
    
    const { error } = listingJoiSchema.validate(listingData);
    if (error) {
      console.log('Validation error:', error.details);
      throw new ExpressError(400, error.details.map(d => d.message).join(', '));
    } else {
      console.log('Validation passed');
      next();
    }
  } catch (error) {
    console.error('Error in validateListing middleware:', error);
    throw error;
  }
}

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewJoiSchema.validate(req.body.review);
  if (error) {
    throw new ExpressError(400, error.details.map(d => d.message).join(', '));
  } else {
    next();
  }
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);

  if (!review) {
    req.flash("error", "Review not found.");
    return res.redirect(`/listings/${id}`);
  }

  if (!review.author.equals(req.user._id)) {
    req.flash("error", "You do not have permission to do that!");
    return res.redirect(`/listings/${id}`);
  }

  next();
};