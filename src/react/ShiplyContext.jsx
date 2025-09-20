import React, { createContext, useContext, useState, useEffect } from 'react';
import Shiply from '../core/Shiply.js';

// Create the context
const ShiplyContext = createContext(null);

// Provider component
export const ShiplyProvider = ({ 
  apiKey, 
  websiteId, 
  children, 
  theme = {}, 
  position = {}, 
  size = {}, 
  text = {}, 
  categories = [], 
  autoShow = false, 
  autoShowDelay = 5000,
  onFeedbackSubmit,
  onError,
  ...rest 
}) => {
  const [shiplyInstance, setShiplyInstance] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!apiKey) {
      const errorMsg = 'ShiplyProvider: apiKey is required';
      setError(errorMsg);
      if (onError) onError(new Error(errorMsg));
      return;
    }

    try {
      // Generate websiteId from hostname if not provided
      const resolvedWebsiteId = websiteId || (typeof window !== 'undefined' ? window.location.hostname : 'default');

      const config = {
        apiKey,
        websiteId: resolvedWebsiteId,
        theme,
        position,
        size,
        text,
        categories,
        autoShow,
        autoShowDelay,
        onFeedbackSubmit,
        onError,
        ...rest
      };

      const instance = new Shiply(config);
      instance.init();
      setShiplyInstance(instance);
      setIsInitialized(true);
      setError(null);

      // Auto-show if enabled
      if (autoShow) {
        setTimeout(() => {
          instance.show();
        }, autoShowDelay);
      }
    } catch (e) {
      console.error("ShiplyProvider initialization error:", e);
      setError(e.message);
      if (onError) onError(e);
    }

    // Cleanup function
    return () => {
      if (shiplyInstance && shiplyInstance.destroy) {
        shiplyInstance.destroy();
      }
    };
  }, [apiKey, websiteId, theme, position, size, text, categories, autoShow, autoShowDelay, onFeedbackSubmit, onError]);

  const contextValue = {
    shiplyInstance,
    isInitialized,
    error,
    apiKey,
    websiteId: websiteId || (typeof window !== 'undefined' ? window.location.hostname : 'default'),
    theme,
    position,
    size,
    text,
    categories,
    autoShow,
    autoShowDelay,
    onFeedbackSubmit,
    onError
  };

  return (
    <ShiplyContext.Provider value={contextValue}>
      {children}
    </ShiplyContext.Provider>
  );
};

// Hook to use the context
export const useShiply = () => {
  const context = useContext(ShiplyContext);
  if (!context) {
    throw new Error('useShiply must be used within a ShiplyProvider');
  }
  return context;
};

// Export the context for advanced usage
export { ShiplyContext };
