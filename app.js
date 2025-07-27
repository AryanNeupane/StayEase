const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./models/listing");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError");
const { listingJoiSchema, reviewJoiSchema } = require("./schema.js");

const Review= require("./models/review");



const MONGO_URL = "mongodb://127.0.0.1:27017/StayEase";

async function main() {
  await mongoose.connect(MONGO_URL);
}
main()
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// Home route
app.get("/", (req, res) => {
  res.send("Hello World This is Aryan");
});


const validateListing = (req, res, next) => {
  const { error } = listingJoiSchema.validate(req.body.listing);  // validate req.body.listing, not entire req.body
  if (error) {
    throw new ExpressError(400, error.details.map(d => d.message).join(', '));
  } else {
    next();
  }
}

const validateReview = (req, res, next) => {
  const { error } = reviewJoiSchema.validate(req.body.review);  // validate req.body.review
  if (error) {
    throw new ExpressError(400, error.details.map(d => d.message).join(', '));
  } else {
    next();
  }
};



// Index Route - list all listings
app.get(
  "/listings",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  })
);

// New Route - form to create new listing
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

// Show Route - show one listing by id
// Show Route - show one listing by id WITH reviews populated
app.get(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id).populate('reviews'); // <-- populate reviews here
    if (!listing) {
      throw new ExpressError(404, "Listing Not Found");
    }
    res.render("listings/show.ejs", { listing });
  })
);


// Create Route - save new listing
app.post(
  "/listings",validateListing,
  wrapAsync(async (req, res) => {
   
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  })
);

// Edit Route - form to edit listing
app.get(
  "/listings/:id/edit",
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
app.put(
  "/listings/:id",validateListing,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const updatedListing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });
    if (!updatedListing) {
      throw new ExpressError(404, "Listing Not Found");
    }
    res.redirect(`/listings/${id}`);
  })
);

// Delete Route - delete listing
app.delete(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const deletedListing = await Listing.findByIdAndDelete(id);
    if (!deletedListing) {
      throw new ExpressError(404, "Listing Not Found");
    }
    res.redirect("/listings");
  })
);


// REviews
//Post Route

app.post(
  "/listings/:id/reviews", validateReview,
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
   let newReview = new Review(req.body.review);
    
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${id}`);
  })
);


// Delete Review Route
app.delete(
  "/listings/:id/reviews/:reviewId",
  wrapAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      throw new ExpressError(404, "Listing Not Found");
    }     
    // Remove the review from the listing's reviews array
    listing.reviews = listing.reviews.filter(review => review._id.toString() !== reviewId);
    await listing.save();   
    // Delete the review document from the database
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/listings/${id}`);
  })
);






// 404 handler for all other routes
// v5
app.get('/{*splat}', async (req, res,next) => {
  next(new ExpressError(404, "Page Not Found !"));
})

// General error handler
app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong!" } = err;
  res.status(status).render("error", { errorMessage: message });
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
