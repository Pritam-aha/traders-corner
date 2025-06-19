import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect } from 'react';
import './Notification.css';

const Notification = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'fas fa-check-circle';
      case 'error':
        return 'fas fa-exclamation-circle';
      case 'warning':
        return 'fas fa-exclamation-triangle';
      case 'info':
      default:
        return 'fas fa-info-circle';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className={`notification ${type}`}
        initial={{ opacity: 0, y: -50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <div className="notification-content">
          <div className="notification-icon">
            <i className={getIcon()}></i>
          </div>
          <div className="notification-message">
            {message}
          </div>
          <button className="notification-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Notification; 