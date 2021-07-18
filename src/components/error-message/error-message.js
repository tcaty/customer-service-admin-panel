import React from 'react';

import { MdErrorOutline } from 'react-icons/md';

import './error-message.css';

const ErrorMessage = () => {
  return (
    <div className="error-message">
      <span className="error-message__text">Something goes wrong</span>
      <span className="error-message__icon"><MdErrorOutline /></span>
    </div>
  );
};

export default ErrorMessage;