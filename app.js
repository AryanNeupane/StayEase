/**
 * StayEase - Main Server File
 * 
 * This is the entry point of the StayEase vacation rental application.
 * It sets up the Express server, connects to MongoDB, configures middleware,
 * and defines the application routes.
 */

// Load environment variables from .env file
require('dotenv').config()

// Log the MongoDB URI for debugging (remove in production)
// console.log('Loaded MONGODB URI:', process.env.ATLAS_URL);

// Import required dependencies
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override"); // Allows PUT/DELETE requests from forms
const ejsMate = require("ejs-mate"); // Enhanced EJS templating
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const MongoStore = require("connect-mongo"); // Store sessions in MongoDB
const flash = require("connect-flash"); // Flash messages for user feedback
const passport = require("passport");
const User = require("./models/user");
const LocalStrategy = require("passport-local").Strategy; 

// Import route handlers
const listingRouter = require("./routes/listing");
const reviewRouter = require("./routes/review");
const userRouter = require("./routes/user");

// Database connection configuration
const dbUrl = process.env.ATLAS_URL;

/**
 * Connect to MongoDB Atlas
 * This function establishes the database connection and handles any connection errors
 */
async function main() {
  try {
    // console.log('Connecting with URI:', dbUrl);
    await mongoose.connect(dbUrl);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

// Initialize database connection
main();
// Note: main() is called twice - this should be removed in production

// Configure Express application settings
app.set("view engine", "ejs"); // Set EJS as the template engine
app.set("views", path.join(__dirname, "views")); // Set views directory
app.engine("ejs", ejsMate); // Use ejs-mate for enhanced EJS features

// Configure middleware
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(methodOverride("_method")); // Enable PUT/DELETE methods from forms
app.use(express.static(path.join(__dirname, "public"))); // Serve static files
app.use('/uploads', express.static(path.join(__dirname, "uploads"))); // Serve uploaded images

// Configure session store with MongoDB
const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60, // Update session only once per day
  crypto: {
    secret: process.env.SECRET, // Encrypt session data
  },
});

// Handle session store errors
store.on("error", function(e) {
  console.log("SESSION STORE ERROR", e);
});

// Configure session options
const sessionOptions = {
  store, // Use MongoDB to store sessions
  secret: process.env.SECRET, // Secret key for session encryption
  resave: false, // Don't save session if unmodified
  saveUninitialized: true, // Save new sessions
  cookie: {
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week expiration
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week max age
    httpOnly: true, // Prevent client-side JavaScript access
    secure: false, // Set to true for HTTPS in production
  },
}

// Apply session and flash middleware
app.use(session(sessionOptions));
app.use(flash());

// Configure Passport.js for authentication
app.use(passport.initialize()); // Initialize Passport
app.use(passport.session()); // Enable persistent login sessions
passport.use(new LocalStrategy(User.authenticate())); // Use local strategy
passport.serializeUser(User.serializeUser()); // Serialize user for session
passport.deserializeUser(User.deserializeUser()); // Deserialize user from session

/**
 * Global middleware to make user data and flash messages available to all templates
 * This middleware runs on every request
 */
app.use((req, res, next) => {
  res.locals.success = req.flash("success"); // Success flash messages
  res.locals.error = req.flash("error"); // Error flash messages
  res.locals.currentUser = req.user; // Current authenticated user
  next();
});

// Define application routes
// All routes starting with /listings are handled by the listing router
app.use("/listings", listingRouter);
// Review routes are nested under listings (e.g., /listings/:id/reviews)
app.use("/listings/:id/reviews", reviewRouter);
// User authentication routes (signup, login, logout)
app.use("/", userRouter);

/**
 * 404 Error Handler
 * Catches all unmatched routes and passes them to the error handler
 */
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/{*splat}', async (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
})

/**
 * Global Error Handler
 * Handles all errors thrown in the application
 * Provides different error responses for development and production
 */
app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong!" } = err;

  // In development, show detailed error information
  if (process.env.NODE_ENV === 'development') {
    return res.status(status).render("error", { 
      errorMessage: message, 
      errorStack: err.stack || '' // Include stack trace for debugging
    });
  }

  // In production, show generic error message
  res.status(status).render("error", { 
    errorMessage: message,
    errorStack: '' // Don't expose stack trace in production
  });
});

// Start the server
app.listen(3000, () => {
  console.log("StayEase server is running on port 3000");
});
