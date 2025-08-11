/**
 * User Controller
 * 
 * This file contains all the business logic for user authentication including:
 * - User registration (signup)
 * - User login and logout
 * - Passport.js integration
 */

const User = require('../models/user');

/**
 * Render Signup Form - Display signup page
 * GET /signup
 * 
 * Renders the signup form for new user registration
 */
module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup"); // Render signup form
};

/**
 * Handle Signup Logic - Process user registration
 * POST /signup
 * 
 * Creates a new user account and automatically logs them in
 */
module.exports.signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body; // Extract user data from form
    
    // Create new user object (password will be hashed by Passport)
    const newUser = new User({ username, email });
    
    // Register user with Passport (this hashes the password)
    const registeredUser = await User.register(newUser, password);
    
    // Automatically log in the user after successful registration
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to StayEase!");
      res.redirect("/listings"); // Redirect to listings page
    });
  } catch (e) {
    req.flash("error", e.message); // Show error message if registration fails
    res.redirect("/signup"); // Redirect back to signup form
  }
};

/**
 * Render Login Form - Display login page
 * GET /login
 * 
 * Renders the login form for existing users
 */
module.exports.renderLoginForm = (req, res) => {
  res.render("users/login"); // Render login form
};

/**
 * Handle Login Logic - Process user login
 * POST /login
 * 
 * Handles successful login after Passport authentication
 */
module.exports.login = (req, res) => {
  req.flash("success", "Welcome back!");
  
  // Redirect to the page user was trying to access, or listings page
  const redirectUrl = req.session.redirectUrl || "/listings";
  delete req.session.redirectUrl; // Clean up the stored URL
  
  res.redirect(redirectUrl);
};

/**
 * Handle Logout - Process user logout
 * GET /logout
 * 
 * Logs out the user and destroys their session
 */
module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "Goodbye!");
    res.redirect("/listings"); // Redirect to listings page
  });
};
