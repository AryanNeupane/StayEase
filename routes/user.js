/**
 * User Authentication Routes
 * 
 * This file defines all routes related to user authentication including:
 * - User registration (signup)
 * - User login and logout
 * - Passport.js authentication integration
 */

const express = require('express');
const router = express.Router();
const passport = require('passport');
const wrapAsync = require('../utils/wrapAsync');
const { saveRedirectUrl } = require('../middleware');
const userController = require('../controllers/users');

/**
 * Signup Routes
 * GET /signup - Display signup form
 * POST /signup - Process user registration
 */
router.get("/signup", userController.renderSignupForm); // Display signup form
router.post("/signup", wrapAsync(userController.signup)); // Handle user registration

/**
 * Login Routes
 * GET /login - Display login form
 * POST /login - Authenticate user with Passport.js
 * 
 * The login process uses Passport.js local strategy:
 * 1. saveRedirectUrl - Saves the original URL to redirect after login
 * 2. passport.authenticate - Handles authentication with local strategy
 * 3. userController.login - Handles successful login
 */
router.get("/login", userController.renderLoginForm); // Display login form
router.post(
  "/login",
  saveRedirectUrl, // Save the URL user was trying to access
  passport.authenticate("local", {
    failureRedirect: "/login", // Redirect to login on failure
    failureFlash: true, // Show flash message on failure
  }),
  userController.login // Handle successful login
);

/**
 * Logout Route
 * GET /logout - Logout user and destroy session
 */
router.get("/logout", userController.logout); // Handle user logout

module.exports = router;
