const { createProxyMiddleware } = require("http-proxy-middleware");

/**
 * Configures the proxy middleware for the development server.
 *
 * @param {Object} app - The Express app instance.
 */
module.exports = function (app) {
  // Determine the backend URL based on the environment.
  const ENVIRONMENT = process.env.REACT_APP_ENVIRONMENT || "local";
  const APP_MS_1 = process.env.REACT_APP_MS_1_URL || "false";
  const APP_MS_2 = process.env.REACT_APP_MS_2_URL || "false";

  if (ENVIRONMENT === 'local') {
    MS_1_URL = `http://${APP_MS_1}`;
    MS_2_URL = `http://${APP_MS_2}`;
  } else {
    MS_1_URL = `https://${APP_MS_1}`;
    MS_2_URL = `https://${APP_MS_2}`;
  }
  // Configure the proxy middleware to proxy API requests to the backend.
  /**
   * Proxy middleware configuration.
   *
   * @param {string} "/api" - The path prefix for the API requests.
   * @param {Object} createProxyMiddlewareOptions - The options for the proxy middleware.
   * @param {string} createProxyMiddlewareOptions.target - The target backend URL.
   * @param {boolean} createProxyMiddlewareOptions.changeOrigin - Whether to change the origin of the request.
   */
  app.use(
    "/ms-1",
    createProxyMiddleware({
      target: MS_1_URL,
      changeOrigin: true,
      secure: true, // This will accept self-signed certificates
    })
  );
  app.use(
    "/ms-2",
    createProxyMiddleware({
      target: MS_2_URL,
      changeOrigin: true,
      secure: true, // This will accept self-signed certificates
    })
  )
};
