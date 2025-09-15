import { validateConfig, mergeConfig } from '../src/utils/config';

describe('Configuration', () => {
  describe('validateConfig', () => {
    test('should validate correct configuration', () => {
      const config = {
        apiKey: 'test-key',
        websiteId: 'test-site',
        categories: [
          { value: 'bug', label: 'Bug Report' },
          { value: 'feature', label: 'Feature Request' },
        ],
      };
      
      expect(() => validateConfig(config)).not.toThrow();
    });

    test('should throw error for missing apiKey', () => {
      const config = {
        websiteId: 'test-site',
      };
      
      expect(() => validateConfig(config)).toThrow('API key is required');
    });

    test('should throw error for missing websiteId', () => {
      const config = {
        apiKey: 'test-key',
      };
      
      expect(() => validateConfig(config)).toThrow('Website ID is required');
    });

    test('should throw error for invalid categories', () => {
      const config = {
        apiKey: 'test-key',
        websiteId: 'test-site',
        categories: 'not-an-array',
      };
      
      expect(() => validateConfig(config)).toThrow('Categories must be an array');
    });

    test('should throw error for invalid category structure', () => {
      const config = {
        apiKey: 'test-key',
        websiteId: 'test-site',
        categories: [
          { value: 'bug' }, // missing label
        ],
      };
      
      expect(() => validateConfig(config)).toThrow("Category at index 0 must have 'value' and 'label' properties");
    });

    test('should throw error for invalid zIndex', () => {
      const config = {
        apiKey: 'test-key',
        websiteId: 'test-site',
        zIndex: -1,
      };
      
      expect(() => validateConfig(config)).toThrow('zIndex must be a positive number');
    });

    test('should throw error for invalid timeout', () => {
      const config = {
        apiKey: 'test-key',
        websiteId: 'test-site',
        timeout: 500, // too small
      };
      
      expect(() => validateConfig(config)).toThrow('Timeout must be a number greater than 1000ms');
    });

    test('should validate theme colors', () => {
      const config = {
        apiKey: 'test-key',
        websiteId: 'test-site',
        theme: {
          primaryColor: '#ff0000',
          backgroundColor: 'rgb(255, 255, 255)',
          textColor: 'blue',
        },
      };
      
      expect(() => validateConfig(config)).not.toThrow();
    });

    test('should throw error for invalid theme colors', () => {
      const config = {
        apiKey: 'test-key',
        websiteId: 'test-site',
        theme: {
          primaryColor: 'invalid-color',
        },
      };
      
      expect(() => validateConfig(config)).toThrow('Theme primaryColor must be a valid color');
    });
  });

  describe('mergeConfig', () => {
    test('should merge user config with defaults', () => {
      const userConfig = {
        apiKey: 'user-key',
        websiteId: 'user-site',
        theme: {
          primaryColor: '#ff0000',
        },
      };
      
      const merged = mergeConfig(userConfig);
      
      expect(merged.apiKey).toBe('user-key');
      expect(merged.websiteId).toBe('user-site');
      expect(merged.theme.primaryColor).toBe('#ff0000');
      expect(merged.theme.backgroundColor).toBe('#ffffff'); // default value
    });

    test('should handle empty user config', () => {
      const merged = mergeConfig({});
      
      expect(merged.apiKey).toBe('');
      expect(merged.websiteId).toBe('');
      expect(merged.theme.primaryColor).toBe('#007bff');
    });
  });
});

