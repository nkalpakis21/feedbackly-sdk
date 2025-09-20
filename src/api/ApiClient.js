/**
 * API Client for communicating with Shiply backend
 */
import logger from '../utils/logger.js';
class ApiClient {
  constructor(config) {
    this.config = config;
    this.baseUrl = this.getApiUrl(config);
    this.apiKey = config.apiKey;
    this.timeout = config.timeout || 10000;
  }

  /**
   * Get the appropriate API URL based on configuration and environment
   * @param {Object} config - Configuration object
   * @returns {string} API base URL
   */
  getApiUrl(config) {
    // If apiUrl is explicitly provided, use it
    if (config.apiUrl) {
      return config.apiUrl;
    }

    // Check for environment variables to determine API URL
    // This works in both browser and Node.js environments
    const isLocalDevelopment =
      (typeof process !== 'undefined' &&
        process.env.NODE_ENV === 'development') ||
      (typeof window !== 'undefined' &&
        window.location.hostname === 'localhost') ||
      (typeof window !== 'undefined' &&
        window.location.hostname === '127.0.0.1') ||
      (typeof window !== 'undefined' &&
        window.location.hostname.includes('local'));

    // Check for specific environment variable to use local API
    const useLocalApi =
      (typeof process !== 'undefined' &&
        process.env.USE_LOCAL_API === 'true') ||
      (typeof window !== 'undefined' &&
        window.location.search.includes('Shiply-local=true'));

    if (isLocalDevelopment && useLocalApi) {
      return 'http://localhost:3000';
    }

    // Default to production API
    return 'https://www.shiplyai.com';
  }

  /**
   * Submit feedback to the API
   * @param {Object} feedbackData - Feedback data
   */
  async submitFeedback(feedbackData) {
    try {
      const response = await this.makeRequest('/api/feedback', {
        method: 'POST',
        body: JSON.stringify({
          ...feedbackData,
          websiteId: this.config.websiteId,
          apiKey: this.apiKey,
        }),
      });

      return response;
    } catch (error) {
      logger.error('Failed to submit feedback:', error);
      throw error;
    }
  }

  /**
   * Track a custom event
   * @param {string} eventName - Event name
   * @param {Object} eventData - Event data
   */
  async trackEvent(eventName, eventData) {
    try {
      const response = await this.makeRequest('/api/events', {
        method: 'POST',
        body: JSON.stringify({
          eventName,
          eventData,
          websiteId: this.config.websiteId,
          apiKey: this.apiKey,
        }),
      });

      return response;
    } catch (error) {
      logger.error('Failed to track event:', error);
      // Don't throw for tracking events to avoid breaking user experience
    }
  }

  /**
   * Make HTTP request with timeout and error handling
   * @param {string} endpoint - API endpoint
   * @param {Object} options - Request options
   */
  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;

    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      timeout: this.timeout,
    };

    const requestOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    };

    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...requestOptions,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error.name === 'AbortError') {
        throw new Error('Request timeout');
      }

      throw error;
    }
  }

  /**
   * Send feedback with retry logic
   * @param {Object} feedbackData - Feedback data
   * @param {number} retries - Number of retries
   */
  async submitFeedbackWithRetry(feedbackData, retries = 3) {
    for (let i = 0; i < retries; i++) {
      try {
        return await this.submitFeedback(feedbackData);
      } catch (error) {
        if (i === retries - 1) {
          throw error;
        }

        // Wait before retry (exponential backoff)
        await new Promise(resolve =>
          setTimeout(resolve, Math.pow(2, i) * 1000)
        );
      }
    }
  }
}

export default ApiClient;
