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

## Troubleshooting

### Common Issues

#### CORS (Cross-Origin Resource Sharing) Errors

If you're seeing errors like `"Access to fetch at 'https://api.shiply.com/api/feedback' from origin 'https://yourdomain.com' has been blocked by CORS policy"`, this means your API server needs to be configured to allow cross-origin requests.

**Symptoms:**
- Network requests fail with CORS errors in browser console
- Feedback submissions don't work from your website
- Browser blocks requests to the API

**Solution:**
Your API server (where you host the Shiply API endpoints) needs to include proper CORS headers. Here's what your API routes should include:

```javascript
// Example for Next.js API routes
export async function POST(request) {
  const origin = request.headers.get('origin');
  
  // Your API logic here...
  
  const response = NextResponse.json({
    success: true,
    message: 'Feedback submitted successfully'
  });
  
  // Add CORS headers
  response.headers.set('Access-Control-Allow-Origin', origin || '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  
  return response;
}

// Handle preflight requests
export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Allow-Credentials': 'true',
    },
  });
}
```

**For other frameworks:**

**Express.js:**
```javascript
const cors = require('cors');
app.use(cors({
  origin: ['https://yourdomain.com', 'https://www.yourdomain.com'],
  credentials: true
}));
```

**Vercel:**
```javascript
// In your API route
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // Your API logic here...
}
```

#### SDK Not Loading

**Symptoms:**
- `"Shiply is not defined"` error
- Widget doesn't appear on page
- Console shows module loading errors

**Solutions:**
1. **Check script loading order**: Make sure the SDK script loads before your initialization code
2. **Verify CDN URL**: Ensure the CDN URL is correct and accessible
3. **Check network connectivity**: Verify the SDK can be downloaded from the CDN

```html
<!-- Correct loading order -->
<script src="https://cdn.shiply.com/sdk/shiply.min.js"></script>
<script>
  // Your Shiply initialization code here
  const shiply = new Shiply({
    apiKey: 'your-api-key',
    websiteId: 'your-website-id'
  });
</script>
```

#### Widget Not Appearing

**Symptoms:**
- No feedback button visible
- Widget doesn't show when triggered
- Console shows initialization errors

**Solutions:**
1. **Check configuration**: Ensure `apiKey` and `websiteId` are provided
2. **Verify CSS**: Make sure no CSS is hiding the widget (check `z-index`, `display: none`, etc.)
3. **Check console errors**: Look for JavaScript errors that might prevent initialization

```javascript
// Debug configuration
const shiply = new Shiply({
  apiKey: 'your-api-key',        // Required
  websiteId: 'your-website-id',  // Required
  zIndex: 9999,                  // Ensure it's above other elements
  position: {
    bottom: '20px',
    right: '20px'
  }
});

// Check if initialized
console.log('Shiply initialized:', shiply.isInitialized());
```

#### API Requests Failing

**Symptoms:**
- Feedback submissions fail silently
- Network tab shows failed requests
- Console shows API errors

**Solutions:**
1. **Check API endpoint**: Verify the `apiUrl` is correct
2. **Validate API key**: Ensure your API key is valid and has proper permissions
3. **Check request format**: Verify the request payload matches expected format

```javascript
// Enable development mode for debugging
const shiply = new Shiply({
  apiKey: 'your-api-key',
  websiteId: 'your-website-id',
  apiUrl: 'https://api.shiply.com', // Verify this URL
  timeout: 10000 // Increase timeout if needed
});

// Check network requests in browser dev tools
// Look for 400/401/403/500 status codes
```

#### Styling Issues

**Symptoms:**
- Widget looks broken or unstyled
- Custom themes not applying
- Mobile responsiveness issues

**Solutions:**
1. **Check CSS conflicts**: Ensure no other CSS is overriding widget styles
2. **Verify theme configuration**: Check that theme properties are valid
3. **Test on different devices**: Verify responsive design works

```javascript
// Debug theme configuration
const shiply = new Shiply({
  apiKey: 'your-api-key',
  websiteId: 'your-website-id',
  theme: {
    primaryColor: '#007bff',     // Valid hex color
    backgroundColor: '#ffffff',  // Valid hex color
    borderRadius: '8px',         // Valid CSS value
    fontSize: '14px'             // Valid CSS value
  }
});
```

### Getting Help

If you're still experiencing issues:

1. **Check the console**: Look for error messages in browser developer tools
2. **Enable development mode**: Add `?shiply-dev=true` to your URL for enhanced logging
3. **Test in isolation**: Create a minimal test page with just the SDK
4. **Check network tab**: Verify API requests are being made correctly

**Debug mode:**
```javascript
// Add this to your URL for enhanced debugging
// https://yourdomain.com?shiply-dev=true

// Or enable programmatically
const shiply = new Shiply({
  apiKey: 'your-api-key',
  websiteId: 'your-website-id',
  // Development mode will be auto-detected
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
