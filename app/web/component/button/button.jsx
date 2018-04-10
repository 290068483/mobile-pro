import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './button.less';

const Button = (props) => {
  const { text, buttonClass, icon, iconRotate, click } = props;

  return (
    <a href="javascript:void(0);" onClick={click} className={`button ${buttonClass !== '' ? buttonClass : ''}`}>
      {icon && <span className={`button-icon${iconRotate ? ' button-icon-rotate' : ''} ${icon || ''}`}></span>}
      <span className="button-text">{text}</span>
    </a>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  buttonClass: PropTypes.string.isRequired,
  icon: PropTypes.string,
  iconRotate: PropTypes.bool,
  click: PropTypes.func
};

Button.defaultProps = {
  text: '',
  buttonClass: '',
  icon: '',
  iconRotate: false
};

export default Button;
