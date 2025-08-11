/**
 * Async Error Wrapper Utility
 * 
 * This utility function wraps async route handlers to automatically catch
 * and forward errors to Express's error handling middleware.
 * 
 * Without this wrapper, unhandled promise rejections in async functions
 * would crash the application. This ensures all errors are properly handled.
 */

/**
 * Wraps an async function to catch errors and pass them to Express error handler
 * 
 * @param {Function} fn - The async function to wrap
 * @returns {Function} - Express middleware function that catches async errors
 * 
 * Usage:
 * router.get('/route', wrapAsync(async (req, res) => {
 *   // async code here
 * }));
 */
module.exports = (fn) => {
  return (req, res, next) => {
    // Execute the async function and catch any errors
    fn(req, res, next).catch(next);
  };
};