# Shiply SDK

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
<script src="https://cdn.Shiply.com/sdk/Shiply.min.js"></script>
```

### NPM

```bash
npm install Shiply-sdk
```

```javascript
import Shiply from 'Shiply-sdk';
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
- Adding `?Shiply-dev=true` to your URL

## Quick Start

```javascript
// Initialize Shiply
const Shiply = new Shiply({
    apiKey: 'your-api-key',
    websiteId: 'your-website-id'
});

// Initialize and show the widget
Shiply.init().show();
```

## Configuration

### Basic Configuration

```javascript
const Shiply = new Shiply({
    // Required
    apiKey: 'your-api-key',
    websiteId: 'your-website-id',
    
    // Optional
    apiUrl: 'https://api.Shiply.com',
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
Shiply.init({
    apiKey: 'your-api-key',
    websiteId: 'your-website-id'
});
```

#### `show()`
Show the feedback widget.

```javascript
Shiply.show();
```

#### `hide()`
Hide the feedback widget.

```javascript
Shiply.hide();
```

#### `toggle()`
Toggle the feedback widget visibility.

```javascript
Shiply.toggle();
```

#### `setUser(userInfo)`
Set user information for feedback context.

```javascript
Shiply.setUser({
    id: 'user-123',
    email: 'user@example.com',
    name: 'John Doe'
});
```

#### `track(eventName, eventData)`
Track custom events.

```javascript
Shiply.track('page_view', {
    page: '/products',
    category: 'electronics'
});
```

#### `submitFeedback(feedbackData)`
Submit feedback programmatically.

```javascript
Shiply.submitFeedback({
    rating: 5,
    text: 'Great product!',
    category: 'general'
});
```

#### `getConfig()`
Get current configuration.

```javascript
const config = Shiply.getConfig();
```

#### `updateConfig(newConfig)`
Update configuration.

```javascript
Shiply.updateConfig({
    theme: {
        primaryColor: '#28a745'
    }
});
```

#### `destroy()`
Destroy the SDK instance and clean up.

```javascript
Shiply.destroy();
```

## Advanced Usage

### Custom Styling

```javascript
const Shiply = new Shiply({
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
Shiply.track('feedback_submitted', {
    rating: 5,
    hasText: true,
    category: 'general'
});

// Track widget interactions
Shiply.track('widget_opened');
Shiply.track('widget_closed');
```

### Programmatic Feedback Submission

```javascript
// Submit feedback without showing the widget
Shiply.submitFeedback({
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
git clone https://github.com/nkalpakis21/Shiply-sdk.git
cd Shiply-sdk
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

- 📧 Email: support@Shiply.com
- 📖 Documentation: https://docs.Shiply.com
- 🐛 Issues: https://github.com/nkalpakis21/Shiply-sdk/issues
- 💬 Discussions: https://github.com/nkalpakis21/Shiply-sdk/discussions

## Changelog

### v1.0.0
- Initial release
- Basic feedback widget functionality
- Customizable themes and styling
- API integration
- User management
- Event tracking
# Test workflow fix
