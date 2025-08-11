/**
 * Custom Express Error Class
 * 
 * This class extends the built-in Error class to create custom error objects
 * with additional properties like status code for HTTP error responses.
 * 
 * This allows for consistent error handling throughout the application
 * and proper HTTP status code responses.
 */

/**
 * Custom error class for Express applications
 * Extends the built-in Error class with status code functionality
 */
class ExpressError extends Error {
  /**
   * Create a new ExpressError instance
   * 
   * @param {string} message - Error message to display
   * @param {number} statusCode - HTTP status code (default: 500)
   */
  constructor(message, statusCode) {
    super(); // Call parent Error constructor
    this.message = message; // Set error message
    this.statusCode = statusCode; // Set HTTP status code
  }
}

module.exports = ExpressError;
// Usage example in app.js