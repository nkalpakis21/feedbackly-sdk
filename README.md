# Feedbackly SDK

A lightweight JavaScript SDK for collecting user feedback with a beautiful, customizable widget.

## Features

- 🎨 **Customizable Design** - Full control over colors, fonts, and layout
- 📱 **Responsive** - Works perfectly on desktop and mobile devices
- ⚡ **Lightweight** - Minimal bundle size with no external dependencies
- 🔧 **Easy Integration** - Simple API with comprehensive documentation
- 🎯 **Multiple Feedback Types** - Rating, text feedback, and categories
- 🔒 **Secure** - Built with security best practices
- 🌐 **Cross-Browser** - Works in all modern browsers
- ♿ **Accessible** - WCAG compliant with keyboard navigation support
- 🔧 **Development Mode** - Automatic detection and simulation for local development
- 📝 **TypeScript Support** - Full type definitions included
- ✅ **Robust Validation** - Comprehensive configuration validation
- 🛡️ **Error Handling** - Graceful error handling and recovery

## Installation

### CDN (Recommended)

```html
<script src="https://cdn.feedbackly.com/sdk/feedbackly.min.js"></script>
```

### NPM

```bash
npm install feedbackly-sdk
```

```javascript
import Feedbackly from 'feedbackly-sdk';
```

## Development Mode

The SDK automatically detects development environments and provides helpful features:

- **Automatic Detection**: Detects localhost, demo API keys, and development flags
- **Simulated API Calls**: No real API requests in development mode
- **Enhanced Logging**: Detailed console logs for debugging
- **Error Simulation**: Safe error handling without breaking your app

Development mode is automatically enabled when:
- Running on localhost or 127.0.0.1
- Using demo API keys (`demo-api-key`, `test-key`)
- Adding `?feedbackly-dev=true` to your URL

## Quick Start

```javascript
// Initialize Feedbackly
const feedbackly = new Feedbackly({
    apiKey: 'your-api-key',
    websiteId: 'your-website-id'
});

// Initialize and show the widget
feedbackly.init().show();
```

## Configuration

### Basic Configuration

```javascript
const feedbackly = new Feedbackly({
    // Required
    apiKey: 'your-api-key',
    websiteId: 'your-website-id',
    
    // Optional
    apiUrl: 'https://api.feedbackly.com',
    timeout: 10000,
    
    // Widget appearance
    theme: {
        primaryColor: '#007bff',
        backgroundColor: '#ffffff',
        textColor: '#333333',
        borderColor: '#e1e5e9',
        borderRadius: '8px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: '14px'
    },
    
    // Widget position and size
    position: {
        bottom: '20px',
        right: '20px'
    },
    size: {
        width: '350px',
        height: '500px'
    },
    zIndex: 9999,
    
    // Trigger button
    trigger: {
        icon: '💬',
        size: '60px',
        iconSize: '24px'
    },
    
    // Text content
    text: {
        title: 'Share Your Feedback',
        ratingLabel: 'How would you rate your experience?',
        feedbackLabel: 'Tell us more (optional)',
        feedbackPlaceholder: 'Share your thoughts...',
        submitButton: 'Submit',
        cancelButton: 'Cancel'
    },
    
    // Features
    categories: [
        { value: 'bug', label: 'Bug Report' },
        { value: 'feature', label: 'Feature Request' },
        { value: 'general', label: 'General Feedback' }
    ],
    
    // User information
    user: {
        id: 'user-123',
        email: 'user@example.com',
        name: 'John Doe'
    }
});
```

## API Reference

### Methods

#### `init(config)`
Initialize the SDK with configuration.

```javascript
feedbackly.init({
    apiKey: 'your-api-key',
    websiteId: 'your-website-id'
});
```

#### `show()`
Show the feedback widget.

```javascript
feedbackly.show();
```

#### `hide()`
Hide the feedback widget.

```javascript
feedbackly.hide();
```

#### `toggle()`
Toggle the feedback widget visibility.

```javascript
feedbackly.toggle();
```

#### `setUser(userInfo)`
Set user information for feedback context.

```javascript
feedbackly.setUser({
    id: 'user-123',
    email: 'user@example.com',
    name: 'John Doe'
});
```

#### `track(eventName, eventData)`
Track custom events.

```javascript
feedbackly.track('page_view', {
    page: '/products',
    category: 'electronics'
});
```

#### `submitFeedback(feedbackData)`
Submit feedback programmatically.

```javascript
feedbackly.submitFeedback({
    rating: 5,
    text: 'Great product!',
    category: 'general'
});
```

#### `getConfig()`
Get current configuration.

```javascript
const config = feedbackly.getConfig();
```

#### `updateConfig(newConfig)`
Update configuration.

```javascript
feedbackly.updateConfig({
    theme: {
        primaryColor: '#28a745'
    }
});
```

#### `destroy()`
Destroy the SDK instance and clean up.

```javascript
feedbackly.destroy();
```

## Advanced Usage

### Custom Styling

```javascript
const feedbackly = new Feedbackly({
    apiKey: 'your-api-key',
    websiteId: 'your-website-id',
    theme: {
        primaryColor: '#e74c3c',
        backgroundColor: '#2c3e50',
        textColor: '#ecf0f1',
        borderRadius: '12px',
        fontFamily: 'Arial, sans-serif'
    }
});
```

### Event Handling

```javascript
// Track when feedback is submitted
feedbackly.track('feedback_submitted', {
    rating: 5,
    hasText: true,
    category: 'general'
});

// Track widget interactions
feedbackly.track('widget_opened');
feedbackly.track('widget_closed');
```

### Programmatic Feedback Submission

```javascript
// Submit feedback without showing the widget
feedbackly.submitFeedback({
    rating: 4,
    text: 'Good experience overall',
    category: 'general',
    metadata: {
        page: window.location.pathname,
        referrer: document.referrer
    }
});
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Internet Explorer 11 (with polyfills)

## Development

### Setup

```bash
git clone https://github.com/nkalpakis21/feedbackly-sdk.git
cd feedbackly-sdk
npm install
```

### Build

```bash
# Development build
npm run build:dev

# Production build
npm run build
```

### Development Server

```bash
npm run dev
```

### Testing

```bash
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- 📧 Email: support@feedbackly.com
- 📖 Documentation: https://docs.feedbackly.com
- 🐛 Issues: https://github.com/nkalpakis21/feedbackly-sdk/issues
- 💬 Discussions: https://github.com/nkalpakis21/feedbackly-sdk/discussions

## Changelog

### v1.0.0
- Initial release
- Basic feedback widget functionality
- Customizable themes and styling
- API integration
- User management
- Event tracking
