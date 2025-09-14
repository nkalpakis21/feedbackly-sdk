import Feedbackly from '../src/core/Feedbackly';
import { validateConfig } from '../src/utils/config';

// Mock dependencies
jest.mock('../src/api/ApiClient');
jest.mock('../src/widget/FeedbackWidget');

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
      expect(() => new Feedbackly({})).toThrow();
    });
  });

  describe('Widget Control', () => {
    beforeEach(() => {
      feedbackly.init();
    });

    test('should show widget', () => {
      feedbackly.show();
      expect(feedbackly.isVisible()).toBe(true);
    });

    test('should hide widget', () => {
      feedbackly.show();
      feedbackly.hide();
      expect(feedbackly.isVisible()).toBe(false);
    });

    test('should toggle widget visibility', () => {
      expect(feedbackly.isVisible()).toBe(false);
      feedbackly.toggle();
      expect(feedbackly.isVisible()).toBe(true);
      feedbackly.toggle();
      expect(feedbackly.isVisible()).toBe(false);
    });
  });

  describe('User Management', () => {
    test('should set user information', () => {
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

    test('should track events', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      feedbackly.track('test-event', { data: 'test' });
      
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Development mode: Event tracked')
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
