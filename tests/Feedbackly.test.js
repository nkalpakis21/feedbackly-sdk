import Feedbackly from '../src/core/Feedbackly';
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

jest.mock('../src/widget/FeedbackWidget', () => {
  return jest.fn().mockImplementation(() => ({
    show: jest.fn(),
    hide: jest.fn(),
    toggle: jest.fn(),
    destroy: jest.fn(),
    updateConfig: jest.fn(),
  }));
});

describe('Feedbackly', () => {
  let feedbackly;
  const mockConfig = {
    apiKey: 'test-api-key',
    websiteId: 'test-website',
  };

  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = '';
    feedbackly = new Feedbackly(mockConfig);
  });

  afterEach(() => {
    if (feedbackly) {
      feedbackly.destroy();
    }
  });

  describe('Initialization', () => {
    test('should create Feedbackly instance with valid config', () => {
      expect(feedbackly).toBeInstanceOf(Feedbackly);
      expect(feedbackly.config.apiKey).toBe('test-api-key');
      expect(feedbackly.config.websiteId).toBe('test-website');
    });

    test('should initialize successfully', () => {
      expect(() => feedbackly.init()).not.toThrow();
      expect(feedbackly.isInitialized).toBe(true);
    });

    test('should throw error with invalid config', () => {
      expect(() => {
        const invalidFeedbackly = new Feedbackly({});
        invalidFeedbackly.init();
      }).toThrow();
    });
  });

  describe('Widget Control', () => {
    beforeEach(() => {
      feedbackly.init();
    });

    test('should show widget', () => {
      expect(() => feedbackly.show()).not.toThrow();
    });

    test('should hide widget', () => {
      feedbackly.show();
      expect(() => feedbackly.hide()).not.toThrow();
    });

    test('should toggle widget visibility', () => {
      expect(() => feedbackly.toggle()).not.toThrow();
      expect(() => feedbackly.toggle()).not.toThrow();
    });
  });

  describe('User Management', () => {
    test('should set user information', () => {
      feedbackly.init();
      const user = {
        id: 'user123',
        email: 'test@example.com',
        name: 'Test User',
      };
      
      feedbackly.setUser(user);
      expect(feedbackly.config.user).toEqual(user);
    });
  });

  describe('Event Tracking', () => {
    beforeEach(() => {
      feedbackly.init();
    });

    test('should track events', async () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      await feedbackly.track('test-event', { data: 'test' });
      
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
      
      feedbackly.updateConfig(newConfig);
      expect(feedbackly.config.theme.primaryColor).toBe('#ff0000');
    });
  });

  describe('Cleanup', () => {
    test('should destroy widget properly', () => {
      feedbackly.init();
      feedbackly.show();
      
      expect(() => feedbackly.destroy()).not.toThrow();
      expect(feedbackly.isInitialized).toBe(false);
    });
  });
});
