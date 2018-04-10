import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './toast.less';

const Toast = (props) => {
  const { show, message } = props;

  return (
    <div className={`toast${show ? ' toast-show' : ''}`}>
      <h4 className="toast-message">{message}</h4>
    </div>
  );
};

Toast.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired
};

Toast.defaultProps = {
  show: false,
  message: ''
};

export default Toast;
