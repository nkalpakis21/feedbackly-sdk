import Shiply from '../src/core/Shiply';
import { validateConfig } from '../src/utils/config';

// Mock dependencies
jest.mock('../src/api/ApiClient', () => {
  return jest.fn().mockImplementation(() => ({
    trackEvent: jest.fn().mockImplementation(async (eventName, eventData) => {
      console.log('🔧 Development mode: Event tracked', { eventName, eventData });
      return { success: true, message: 'Event tracked (development mode)' };
    }),
    submitFeedback: jest.fn(),
    getWidgetConfig: jest.fn(),
  }));
});

jest.mock('../src/widget/ShipWidget', () => {
  return jest.fn().mockImplementation(() => ({
    show: jest.fn(),
    hide: jest.fn(),
    toggle: jest.fn(),
    destroy: jest.fn(),
    updateConfig: jest.fn(),
  }));
});

describe('Shiply', () => {
  let shiply;
  const mockConfig = {
    apiKey: 'test-api-key',
    websiteId: 'test-website',
  };

  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = '';
    shiply = new Shiply(mockConfig);
  });

  afterEach(() => {
    if (shiply) {
      shiply.destroy();
    }
  });

  describe('Initialization', () => {
    test('should create Shiply instance with valid config', () => {
      expect(shiply).toBeInstanceOf(Shiply);
      expect(shiply.config.apiKey).toBe('test-api-key');
      expect(shiply.config.websiteId).toBe('test-website');
    });

    test('should initialize successfully', () => {
      expect(() => shiply.init()).not.toThrow();
      expect(shiply.isInitialized).toBe(true);
    });

    test('should throw error with invalid config', () => {
      expect(() => {
        const invalidShiply = new Shiply({});
        invalidShiply.init();
      }).toThrow();
    });
  });

  describe('Widget Control', () => {
    beforeEach(() => {
      shiply.init();
    });

    test('should show widget', () => {
      expect(() => shiply.show()).not.toThrow();
    });

    test('should hide widget', () => {
      shiply.show();
      expect(() => shiply.hide()).not.toThrow();
    });

    test('should toggle widget visibility', () => {
      expect(() => shiply.toggle()).not.toThrow();
      expect(() => shiply.toggle()).not.toThrow();
    });
  });

  describe('User Management', () => {
    test('should set user information', () => {
      shiply.init();
      const user = {
        id: 'user123',
        email: 'test@example.com',
        name: 'Test User',
      };
      
      shiply.setUser(user);
      expect(shiply.config.user).toEqual(user);
    });
  });

  describe('Event Tracking', () => {
    beforeEach(() => {
      shiply.init();
    });

    test('should track events', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      await shiply.track('test-event', { data: 'test' });
      
      expect(consoleSpy).toHaveBeenCalledWith(
        '🔧 Development mode: Event tracked',
        expect.objectContaining({
          eventName: 'test-event',
          eventData: expect.objectContaining({
            data: 'test'
          })
        })
      );
      
      consoleSpy.mockRestore();
    });
  });

  describe('Configuration Updates', () => {
    test('should update configuration', () => {
      const newConfig = {
        theme: {
          primaryColor: '#ff0000',
        },
      };
      
      shiply.updateConfig(newConfig);
      expect(shiply.config.theme.primaryColor).toBe('#ff0000');
    });
  });

  describe('Cleanup', () => {
    test('should destroy widget properly', () => {
      shiply.init();
      shiply.show();
      
      expect(() => shiply.destroy()).not.toThrow();
      expect(shiply.isInitialized).toBe(false);
    });
  });
});
