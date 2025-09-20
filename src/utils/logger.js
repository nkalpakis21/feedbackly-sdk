/**
 * Simple logger utility for the Shiply SDK
 * Can be configured to enable/disable logging
 */

class Logger {
  constructor() {
    this.enabled =
      typeof window !== 'undefined' &&
      window.location?.hostname === 'localhost';
  }

  log(...args) {
    if (this.enabled) {
      console.log('[Shiply]', ...args);
    }
  }

  error(...args) {
    if (this.enabled) {
      console.error('[Shiply]', ...args);
    }
  }

  warn(...args) {
    if (this.enabled) {
      console.warn('[Shiply]', ...args);
    }
  }

  info(...args) {
    if (this.enabled) {
      console.info('[Shiply]', ...args);
    }
  }
}

export default new Logger();
