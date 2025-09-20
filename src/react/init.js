import Shiply from '../core/Shiply.js';

// Global instance for init() pattern
let globalShiplyInstance = null;

/**
 * Initialize the Shiply SDK globally
 * @param {Object} config - Configuration object
 * @param {string} config.apiKey - Your Shiply API key
 * @param {string} [config.websiteId] - Website ID (auto-generated if not provided)
 * @param {Object} [config.theme] - Theme configuration
 * @param {Object} [config.position] - Position configuration
 * @param {Object} [config.size] - Size configuration
 * @param {Object} [config.text] - Text configuration
 * @param {Array} [config.categories] - Categories configuration
 * @param {boolean} [config.autoShow=false] - Auto-show the widget
 * @param {number} [config.autoShowDelay=5000] - Auto-show delay in ms
 * @param {Function} [config.onFeedbackSubmit] - Feedback submit callback
 * @param {Function} [config.onError] - Error callback
 * @returns {Object} - Shiply instance
 */
export const init = (config = {}) => {
  if (!config.apiKey) {
    throw new Error('Shiply.init(): apiKey is required');
  }

  // Generate websiteId from hostname if not provided
  const resolvedWebsiteId = config.websiteId || (typeof window !== 'undefined' ? window.location.hostname : 'default');

  const fullConfig = {
    ...config,
    websiteId: resolvedWebsiteId
  };

  // Create new instance
  globalShiplyInstance = new Shiply(fullConfig);
  globalShiplyInstance.init();

  // Auto-show if enabled
  if (config.autoShow) {
    setTimeout(() => {
      globalShiplyInstance.show();
    }, config.autoShowDelay || 5000);
  }

  return globalShiplyInstance;
};

/**
 * Get the global Shiply instance
 * @returns {Object|null} - Global Shiply instance
 */
export const getInstance = () => {
  return globalShiplyInstance;
};

/**
 * Show the feedback widget
 */
export const show = () => {
  if (!globalShiplyInstance) {
    throw new Error('Shiply not initialized. Call Shiply.init() first.');
  }
  globalShiplyInstance.show();
};

/**
 * Hide the feedback widget
 */
export const hide = () => {
  if (!globalShiplyInstance) {
    throw new Error('Shiply not initialized. Call Shiply.init() first.');
  }
  globalShiplyInstance.hide();
};

/**
 * Toggle the feedback widget
 */
export const toggle = () => {
  if (!globalShiplyInstance) {
    throw new Error('Shiply not initialized. Call Shiply.init() first.');
  }
  globalShiplyInstance.toggle();
};

/**
 * Set user information
 * @param {Object} user - User information
 */
export const setUser = (user) => {
  if (!globalShiplyInstance) {
    throw new Error('Shiply not initialized. Call Shiply.init() first.');
  }
  globalShiplyInstance.setUser(user);
};

/**
 * Track an event
 * @param {string} eventName - Event name
 * @param {Object} eventData - Event data
 */
export const track = (eventName, eventData = {}) => {
  if (!globalShiplyInstance) {
    throw new Error('Shiply not initialized. Call Shiply.init() first.');
  }
  globalShiplyInstance.track(eventName, eventData);
};

/**
 * Submit feedback programmatically
 * @param {Object} feedbackData - Feedback data
 * @returns {Promise} - Promise that resolves with the response
 */
export const submitFeedback = (feedbackData) => {
  if (!globalShiplyInstance) {
    throw new Error('Shiply not initialized. Call Shiply.init() first.');
  }
  return globalShiplyInstance.submitFeedback(feedbackData);
};

/**
 * Destroy the global instance
 */
export const destroy = () => {
  if (globalShiplyInstance) {
    globalShiplyInstance.destroy();
    globalShiplyInstance = null;
  }
};

export default {
  init,
  getInstance,
  show,
  hide,
  toggle,
  setUser,
  track,
  submitFeedback,
  destroy
};
