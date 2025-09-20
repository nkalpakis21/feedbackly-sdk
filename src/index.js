import ShiplyFeedback from './react/ShiplyFeedback.jsx';
import { ShiplyProvider, useShiply } from './react/ShiplyContext.jsx';
import { init, getInstance, show, hide, toggle, setUser, track, submitFeedback, destroy } from './react/init.js';
import Shiply from './core/Shiply.js';
import './styles/main.css';

// Export the React component as default
export default ShiplyFeedback;

// Export all components and functions
export { 
  ShiplyFeedback, 
  ShiplyProvider, 
  useShiply,
  init,
  getInstance,
  show,
  hide,
  toggle,
  setUser,
  track,
  submitFeedback,
  destroy,
  Shiply 
};
