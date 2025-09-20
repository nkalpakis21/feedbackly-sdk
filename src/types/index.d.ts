/**
 * TypeScript type definitions for Feedbackly SDK
 */

import React from 'react';

export interface FeedbacklyConfig {
  apiKey: string;
  websiteId: string;
  apiUrl?: string;
  timeout?: number;

  theme?: {
    primaryColor?: string;
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
    borderRadius?: string;
    fontFamily?: string;
    fontSize?: string;
    headerBackgroundColor?: string;
    footerBackgroundColor?: string;
  };

  position?: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };

  size?: {
    width?: string;
    height?: string;
  };

  zIndex?: number;

  trigger?: {
    icon?: string;
    size?: string;
    iconSize?: string;
  };

  text?: {
    title?: string;
    ratingLabel?: string;
    feedbackLabel?: string;
    feedbackPlaceholder?: string;
    categoryLabel?: string;
    submitButton?: string;
    cancelButton?: string;
  };

  categories?: Array<{
    value: string;
    label: string;
  }>;

  autoShow?: boolean;
  autoShowDelay?: number;
  showOnExit?: boolean;

  user?: {
    id?: string;
    email?: string;
    name?: string;
    photoURL?: string;
  };
}

export interface FeedbackData {
  rating: number;
  feedback?: string;
  category?: string;
  user?: {
    id?: string;
    email?: string;
    name?: string;
    photoURL?: string;
  };
  metadata?: Record<string, unknown>;
  timestamp?: string;
  url?: string;
  userAgent?: string;
}

export interface ApiResponse {
  success: boolean;
  message?: string;
  feedbackId?: string;
  data?: unknown;
  error?: string;
}

export interface EventData {
  eventName: string;
  eventData: Record<string, unknown>;
  timestamp?: string;
  url?: string;
  userAgent?: string;
}

export interface WidgetConfig {
  theme?: FeedbacklyConfig['theme'];
  position?: FeedbacklyConfig['position'];
  size?: FeedbacklyConfig['size'];
  text?: FeedbacklyConfig['text'];
  categories?: FeedbacklyConfig['categories'];
  autoShow?: boolean;
  autoShowDelay?: number;
}

export interface User {
  id?: string;
  email?: string;
  name?: string;
  photoURL?: string;
}

export interface FeedbacklyInstance {
  init(config?: Partial<FeedbacklyConfig>): FeedbacklyInstance;
  show(): void;
  hide(): void;
  toggle(): void;
  destroy(): void;
  setUser(user: User): void;
  track(eventName: string, eventData?: Record<string, unknown>): void;
  submitFeedback(feedbackData: FeedbackData): Promise<ApiResponse>;
  updateConfig(config: Partial<FeedbacklyConfig>): void;
  isInitialized(): boolean;
  isVisible(): boolean;
}

// React Component Props Interface
export interface ShiplyFeedbackProps {
  apiKey: string;
  websiteId?: string;
  theme?: FeedbacklyConfig['theme'];
  position?: FeedbacklyConfig['position'];
  size?: FeedbacklyConfig['size'];
  text?: FeedbacklyConfig['text'];
  categories?: FeedbacklyConfig['categories'];
  autoShow?: boolean;
  autoShowDelay?: number;
  onFeedbackSubmit?: (feedbackData: FeedbackData) => void;
  onError?: (error: Error) => void;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// React Component Types
export declare const ShiplyFeedback: React.FC<ShiplyFeedbackProps>;

// Provider Component Props
export interface ShiplyProviderProps {
  apiKey: string;
  websiteId?: string;
  theme?: FeedbacklyConfig['theme'];
  position?: FeedbacklyConfig['position'];
  size?: FeedbacklyConfig['size'];
  text?: FeedbacklyConfig['text'];
  categories?: FeedbacklyConfig['categories'];
  autoShow?: boolean;
  autoShowDelay?: number;
  onFeedbackSubmit?: (feedbackData: FeedbackData) => void;
  onError?: (error: Error) => void;
  children: React.ReactNode;
}

// Provider Component
export declare const ShiplyProvider: React.FC<ShiplyProviderProps>;

// Hook return type
export interface ShiplyContextValue {
  shiplyInstance: FeedbacklyInstance | null;
  isInitialized: boolean;
  error: string | null;
  apiKey: string;
  websiteId: string;
  theme: FeedbacklyConfig['theme'];
  position: FeedbacklyConfig['position'];
  size: FeedbacklyConfig['size'];
  text: FeedbacklyConfig['text'];
  categories: FeedbacklyConfig['categories'];
  autoShow: boolean;
  autoShowDelay: number;
  onFeedbackSubmit?: (feedbackData: FeedbackData) => void;
  onError?: (error: Error) => void;
}

// Hook
export declare const useShiply: () => ShiplyContextValue;

// Init function
export declare const init: (config: Partial<FeedbacklyConfig>) => FeedbacklyInstance;

// Global functions
export declare const getInstance: () => FeedbacklyInstance | null;
export declare const show: () => void;
export declare const hide: () => void;
export declare const toggle: () => void;
export declare const setUser: (user: User) => void;
export declare const track: (eventName: string, eventData?: Record<string, unknown>) => void;
export declare const submitFeedback: (feedbackData: FeedbackData) => Promise<ApiResponse>;
export declare const destroy: () => void;

// Default export is the React component
declare const ShiplyFeedbackDefault: React.FC<ShiplyFeedbackProps>;
export default ShiplyFeedbackDefault;

declare global {
  interface Window {
    Feedbackly: typeof FeedbacklyInstance;
  }
}
