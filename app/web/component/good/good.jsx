import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './good.less';

const Good = (props) => {
  const { show } = props;

  return (
    <div className={`good${show ? ' good-show' : ''}`}>
      <span className="good-icon icon-like-red"></span>
    </div>
  );
}

Good.propTypes = {
  show: PropTypes.bool.isRequired
};

Good.defaultProps = {
  show: false
};

export default Good;
